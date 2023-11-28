import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserEntity } from "../entities/user.entity"
import { getManager } from "typeorm"
import { env } from "process"
import { LoginUserDTO, RegisUserDTO } from "../dtos/user.dto"
import { ApiResponse } from "../dtos/genericResponse.dto"
import { Response } from "../helpers/response.helper"

export async function loginService(body: LoginUserDTO): Promise<any> {
  const entityManager = getManager();
  const dataUser = await entityManager.findOne(UserEntity, {
    where: [
      { username: body.emailOrUsername },
      { email: body.emailOrUsername },
    ],
    relations: ["role", "role.permissions"],
    select: {
      role: {
        code: true,
      },
    },
  })
  const validate = bcrypt.compare(body.password, dataUser.password)

  if (!dataUser) return Response (401, 'Unauhorized', '')
  if (!validate) return Response (401, 'Unauhorized', '')

  const token = jwt.sign(
    { userId: dataUser.id, roleId: dataUser.role.code },
    env.SECRET_KEY,
    { expiresIn: "1d" }
  )
  return Response (200, 'Login Successfully', token)
}

export async function registerService(body: RegisUserDTO): Promise<ApiResponse<any>> {
  const entityManager = getManager()
  const existUser = await entityManager.findOne(UserEntity, {
    where: {}
  })
  return Response(200, '', '')
}