import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "process";
import { getManager } from "typeorm";
import slugify from "slugify";
import { sendEmail } from "../utils/nodemailer.util";
import { generateDate, generateEmployeeID, generateToken } from "../utils/common.util";
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
    relations: ["role", "role.permissions"],
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

  const role = body.role !== null && body.role !== "" ? body.role : "MPLY"
  const token = generateToken();
  const expiredToken = generateDate(new Date());

  const registUser = await entityManager.save(UserEntity, {
    email: body.email,
    username: body.name,
    slug: slugify(body.name, "-").toLowerCase(),
    password: await bcrypt.hash(body.password, 10),
    role: role,
  });

  const dataUser = await entityManager.find(UserEntity, {
    where: {role: role}
  });

  let employeeId = ''
  
  if (dataUser[0].role === "MPLY") {
    employeeId = generateEmployeeID('EMP', dataUser.length)
  } else if (dataUser[0].role === "HR") {
    employeeId = generateEmployeeID('HR', dataUser.length)
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
  await sendEmail(body.email, token);

  return Response(200, "Register User Successfull", "");
}
