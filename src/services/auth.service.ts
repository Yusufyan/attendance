import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "process";
import { getManager } from "typeorm";
import slugify from "slugify";
import { sendEmail } from "../utils/nodemailer.util";
import {
  generateExpDate,
  generateEmployeeID,
  generateToken,
  encryptOTP,
} from "../utils/common.util";
import { User } from "../models/user.model";
import { Biodata } from "../models/biodata.model";
import { Token } from "../models/token.model";
import {
  ChangePasswordDTO,
  LoginUserDTO,
  RegisUserDTO,
  ResetPasswordDTO,
} from "../dtos/user.dto";
import { ApiResponse } from "../dtos/genericResponse.dto";
import ApiError from "../configs/api-error.config";
import CryptoJS from "crypto-js";
import { PToken } from "../entities/token.entity";

export async function loginService(body: LoginUserDTO): Promise<any> {
  const entityManager = getManager();
  const dataUser = await entityManager.findOne(User, {
    where: [
      { username: body.emailOrUsername },
      { email: body.emailOrUsername },
    ],
    relations: ["userRole", "userRole.permissions"],
    select: {
      userRole: {
        code: true, //Get Only column Code in table Role
      },
    },
  });

  if (!dataUser) throw new ApiError(401, "Bad Credential");

  const validate = await bcrypt.compare(body.password, dataUser.password);

  if (!validate) throw new ApiError(401, "Bad Credential");

  const token = jwt.sign(
    { userId: dataUser.id, roleId: dataUser.userRole.code },
    env.SECRET_KEY,
    { expiresIn: "1d" }
  );
  return { token };
}

export async function registerService(
  body: RegisUserDTO
): Promise<ApiResponse<any>> {
  const entityManager = getManager();
  const existUser = await entityManager.findOne(User, {
    where: { email: body.email, username: body.name },
  });

  if (existUser)
    throw new ApiError(409, "Email or Username has been registered");

  const role = body.role !== null && body.role !== "" ? body.role : "MPLY";
  const token = encryptOTP(generateToken());
  const expiredToken = generateExpDate(new Date());

  const registUser = await entityManager.save(User, {
    email: body.email,
    username: body.name,
    slug: slugify(body.name, "-").toLowerCase(),
    password: await bcrypt.hash(body.password, 10),
    is_active: false,
    role: role,
  });

  const dataUser = await entityManager.find(User, {
    where: { role: role },
  });

  let employeeId = "";

  if (dataUser[0].role === "MPLY") {
    employeeId = generateEmployeeID("EM", dataUser.length);
  } else if (dataUser[0].role === "HR") {
    employeeId = generateEmployeeID("HR", dataUser.length);
  }

  await entityManager.save(Token, {
    token: token,
    expired_in: expiredToken,
    user: registUser,
  });

  await entityManager.save(Biodata, {
    fullname: body.fullname,
    user: registUser,
    phone: body.phone,
    employee_id: employeeId,
  });

  await sendEmail(body.email, token, "");

  return;
}

export async function generateOTPService(email: string, userId: string) {
  const entityManager = getManager();
  const getToken = await entityManager
    .createQueryBuilder(Token, "token")
    .innerJoinAndSelect("token.user", "user")
    .where("user.id = :userId", { userId })
    .andWhere(`user.email = :email`, { email })
    .getOne();

  // console.log(getToken)
  const token = encryptOTP(generateToken());
  const url = `http://localhost:3000/auth/validate/${token}`;

  if (getToken && getToken.expired_in <= new Date()) {
    //For Delete Token
    await entityManager.delete(Token, { id: getToken.id });

    //Make New Token for Table
    const newOTP = await entityManager.save(Token, {
      token: token,
      expired_in: generateExpDate(new Date()),
      user: getToken.user,
    });

    //Send New Token to Email
    await sendEmail(email, token, url);

    return { newOTP };
  } else if (getToken && getToken.expired_in >= new Date()) {
    throw new ApiError(400, "Token not expired");
  } else {
    throw new ApiError(409, "Unauthorized");
  }
}

export async function activateAccountService(token: string) {
  const encryptedOTP = encryptOTP(token);
  const entityManager = getManager();
  const getToken = await entityManager.findOne(Token, {
    where: { token: encryptedOTP },
    relations: ["user"],
  });

  if (getToken) {
    await entityManager.update(
      User,
      { id: getToken.user.id },
      { is_active: true }
    );
    // await entityManager.delete(Token, { id: token })
    await entityManager.update(
      Token,
      { user: getToken.user },
      { is_active: false }
    );
  } else {
    throw new ApiError(404, "Token not found");
  }

  return;
}

export async function validateTokenService(token: string) {
  // const entityManager =
  const entityManager = getManager();
  const getToken = await entityManager.findOne(Token, {
    where: { token: token },
    relations: ["user"],
  });

  if (getToken) {
    await entityManager.update(
      User,
      { id: getToken.user.id },
      { is_active: true }
    );
    await entityManager.delete(Token, { id: token });
  } else {
    throw new ApiError(404, "Token not found");
  }

  return;
}

export async function forgetPasswordService(email: string) {
  const entityManager = getManager();
  const getEmail = await entityManager.findOne(User, {
    where: { email: email },
  });

  if (!getEmail) throw new ApiError(404, "Email not found");

  const token = encryptOTP(generateToken());

  await entityManager.delete(Token, { user: getEmail.id });

  const newOTP = await entityManager.save(Token, {
    token: token,
    expired_in: generateExpDate(new Date()),
    user: getEmail,
    purpose: PToken.RESET_PASSWROD,
  });

  await sendEmail(email, token, "");

  return { newOTP };
}

export async function resetPasswordService(
  body: ResetPasswordDTO,
  token: string
) {
  const entityManager = getManager();
  const getData = await entityManager.findOne(Token, {
    where: { token: token, purpose: PToken.RESET_PASSWROD },
    relations: ["user"],
  });

  if (!getData) throw new ApiError(404, "Token not found");

  if (body.password !== body.confirmPassword) {
    throw new ApiError(404, "Confirm passsword does not match");
  }

  await entityManager.update(
    User,
    { id: getData.user.id },
    {
      password: await bcrypt.hash(body.password, 10),
      updated_at: new Date(),
    }
  );

  await entityManager.delete(Token, { token });

  return;
}

export async function changePasswordService(
  idUser: string,
  body: ChangePasswordDTO
) {
  const entityManager = getManager();
  const getUser = await entityManager.findOne(User, {
    where: {
      id: idUser,
    },
  });

  if (!getUser) throw new ApiError(404, "User not found");

  if (body.newPassword !== body.confirmPassword) {
    throw new ApiError(404, "Confirm passsword does not match");
  }

  await entityManager.update(
    User,
    { id: getUser.id },
    { password: body.newPassword, updated_at: new Date() }
  );

  return;
}

export async function bannedUserService(id: string) {
  const entityManager = getManager();
  const checkUser = await entityManager.findOne(User, {
    where: {
      id,
      is_active: true,
    }
  })

  if(!checkUser) throw new ApiError(400, 'User already banned')

  await entityManager.update(User, {id}, {is_active: false});
  return;
}

export async function deleteUserService(id: string) {
  const entityManager = getManager()
  const checkUser = await entityManager.findOne(User, {
    where: {
      id,
      is_active: false
    }
  })

  if(!checkUser) throw new ApiError(400, 'User not yet banned')

  await entityManager.delete(User, {id})
  return;
}
