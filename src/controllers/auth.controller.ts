import { Request, Response } from "express";
import { LoginUserDTO, RegisUserDTO } from "../dtos/user.dto";
import { loginService, registerService } from "../services/auth.service";
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

    res.json({
      status: user.statusCode,
      message: user.message,
      data: user.data,
    });
  } catch (error) {
    logging.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
