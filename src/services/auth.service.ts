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
import { LoginUserDTO, RegisUserDTO } from "../dtos/user.dto";
import { ApiResponse } from "../dtos/genericResponse.dto";
import ApiError from "../configs/api-error.config";

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

  if (!dataUser) throw new ApiError(401, "Bad Credential")

  const validate = await bcrypt.compare(body.password, dataUser.password);

  if (!validate) throw new ApiError(401, "Bad Credential")

  const token = jwt.sign(
    { userId: dataUser.id, roleId: dataUser.userRole.code },
    env.SECRET_KEY,
    { expiresIn: "1d" }
  );
  return { token }
}

export async function registerService(
  body: RegisUserDTO
): Promise<ApiResponse<any>> {
  const entityManager = getManager();
  const existUser = await entityManager.findOne(User, {
    where: { email: body.email, username: body.name },
  });

  if (existUser) throw new ApiError(409, 'Email or Username has been registered')

  const role = body.role !== null && body.role !== "" ? body.role : "MPLY";
  const token = CryptoJS.AES.encrypt(
    generateToken(),
    env.SECRET_KEY
  ).toString();
  const expiredToken = generateExpDate(new Date());

  const registUser = await entityManager.save(User, {
    email: body.email,
    username: body.name,
    slug: slugify(body.name, "-").toLowerCase(),
    password: await bcrypt.hash(body.password, 10),
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

  await sendEmail(body.email, token, '');

  return
}

export async function generateOTP(email: string) {
  const entityManager = getManager();
  const getToken = await entityManager
    .createQueryBuilder(Token, "token")
    .innerJoinAndSelect("token.user", "user")
    .where("user.email = :email", { email })
    .getOne();
  
  const token = generateToken()
  const otp = encryptOTP(token)
  const url = `http://localhost:3000/auth/validate/${otp}`

  if(getToken.expired_in <= new Date()) {
    await entityManager.delete(Token, {
      where: {
        user: getToken.id
      }
    })
    
    const newOTP = await entityManager.save(Token, {
      token: token,
      expired_in: generateExpDate(new Date()),
      user: getToken.user
    })
    
    await sendEmail(email, token, url)
    
    return { newOTP }
  }
  //  else {
  //   throw new ApiError(400, 'Token not expired')
  // }
}

export async function validateToken(token: string) {
  
}
