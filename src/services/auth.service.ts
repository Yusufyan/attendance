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
import { UserEntity } from "../models/user.model";
import { BiodataEntity } from "../models/biodata.model";
import { TokenEntity } from "../models/token.model";
import { LoginUserDTO, RegisUserDTO } from "../dtos/user.dto";
import { ApiResponse } from "../dtos/genericResponse.dto";
import { Response } from "../helpers/response.helper";

export async function loginService(body: LoginUserDTO): Promise<any> {
  const entityManager = getManager();
  const dataUser = await entityManager.findOne(UserEntity, {
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
  const validate = bcrypt.compare(body.password, dataUser.password);

  if (!dataUser) return Response(401, "Unauhorized", "");
  if (!validate) return Response(401, "Unauhorized", "");

  const token = jwt.sign(
    { userId: dataUser.id, roleId: dataUser.userRole.code },
    env.SECRET_KEY,
    { expiresIn: "1d" }
  );
  return Response(200, "Login Successfully", token);
}

export async function registerService(
  body: RegisUserDTO
): Promise<ApiResponse<any>> {
  const entityManager = getManager();
  const existUser = await entityManager.findOne(UserEntity, {
    where: { email: body.email, username: body.name },
  });

  if (existUser) return Response(409, "Failed! Duplicate User Data", "");

  const role = body.role !== null && body.role !== "" ? body.role : "MPLY";
  const token = CryptoJS.AES.encrypt(
    generateToken(),
    "secret passphrase"
  ).toString();
  const expiredToken = generateExpDate(new Date());

  const registUser = await entityManager.save(UserEntity, {
    email: body.email,
    username: body.name,
    slug: slugify(body.name, "-").toLowerCase(),
    password: await bcrypt.hash(body.password, 10),
    role: role,
  });

  const dataUser = await entityManager.find(UserEntity, {
    where: { role: role },
  });

  let employeeId = "";

  if (dataUser[0].role === "MPLY") {
    employeeId = generateEmployeeID("EM", dataUser.length);
  } else if (dataUser[0].role === "HR") {
    employeeId = generateEmployeeID("HR", dataUser.length);
  }

  await entityManager.save(TokenEntity, {
    token: token,
    expired_in: expiredToken,
    user: registUser,
  });

  await entityManager.save(BiodataEntity, {
    fullname: body.fullname,
    user: registUser,
    phone: body.phone,
    employee_id: employeeId,
  });

  await sendEmail(body.email, token, '');

  return Response(200, "Register User Successfull", "");
}

export async function generateOTP(email: string) {
  const entityManager = getManager();
  const getToken = await entityManager
    .createQueryBuilder(TokenEntity, "token")
    .innerJoinAndSelect("token.user", "user")
    .where("user.email = :email", { email })
    .getOne();
  
  const token = generateToken()
  const otp = encryptOTP(token)
  const url = `http://localhost:3000/auth/validate/${otp}`

  if(getToken.expired_in <= new Date()) {
    await entityManager.delete(TokenEntity, {
      where: {
        user: getToken.id
      }
    })
    
    const newOTP = await entityManager.save(TokenEntity, {
      token: token,
      expired_in: generateExpDate(new Date()),
      user: getToken.user
    })
    
    await sendEmail(email, token, url)
    
    return Response(200, 'Generate Token Successfully, please check email', '')
  } else {
    return Response(400, 'Token not expired', '')
  }
}

export async function validateToken(token: string) {
  
}
