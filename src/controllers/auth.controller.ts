import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { LoginUserDTO } from "../dtos/user.dto";
import { getUserByEmailOrUsername, validatePassword } from "../services/auth.service";
import { env } from "../configs/environment.config";

export async function loginController (req: Request, res: Response) {
    try {
        const body = req.body as LoginUserDTO;

        const user = await getUserByEmailOrUsername(body.emailOrUsername);

        if(!user){
            return res.status(401).json({ message: "Unauthorized"  })
        };

        const validPassword = await validatePassword(user, body.password);

        if(!validPassword){
            return res.status(401).json({ message: "Unauthorized" })
        };

        const token = jwt.sign(
            { userId: user.uuid, roleId: user.role.code },
            env.SECRET_KEY, { expiresIn: "1d" }
        );
        res.status(200).json({ message: "Login Success", data: token})
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}