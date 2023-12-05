import express from "express";

import { loginController, registerController, requestTokenController } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/login", loginController);
authRouter.post("/register", registerController);
authRouter.post("/request-token", requestTokenController);

export default authRouter;
