import express from "express";

import { LoginController } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post('/login', LoginController);

export default authRouter;