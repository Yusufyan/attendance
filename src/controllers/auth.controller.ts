import { Request, Response } from "express";
import { LoginUserDTO, RegisUserDTO } from "../dtos/user.dto";
import { generateOTP, loginService, registerService } from "../services/auth.service";
import { logging } from "../utils/logging.util";

export async function loginController(req: Request, res: Response) {
  try {
    const body = req.body as LoginUserDTO;
    const user = await loginService(body);

    res.status(200).json({
      status: user.statusCode,
      message: user.message,
      data: user.data,
    });
  } catch (error) {
    logging.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function registerController(req: Request, res: Response) {
  try {
    const body = req.body as RegisUserDTO;
    const user = await registerService(body);

    res.status(200).json({
      status: user.statusCode,
      message: user.message,
      data: user.data,
    });
  } catch (error) {
    logging.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function requestTokenController(req: Request, res: Response) {
  try {
    const token:any = await generateOTP(req.body.email)
    res.status(200).json({ token: token.token})
  } catch (error) {
    console.log(error)
  }
}
