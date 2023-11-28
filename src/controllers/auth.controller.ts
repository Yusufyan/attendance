import { Request, Response } from "express"
import { LoginUserDTO } from "../dtos/user.dto"
import {
  loginService,
} from "../services/auth.service"
import { logging } from "../utils/logging.util"

export async function loginController(req: Request, res: Response) {
  try {
    const body = req.body as LoginUserDTO
    const user = await loginService(body)

    res.status(200).json({
      status: 200,
      message: 'Login Successful',
      data: {
        token: user
      }
    })
  } catch (error) {
    logging.error(error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
