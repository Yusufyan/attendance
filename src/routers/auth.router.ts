import express from "express";

import {
  activateAccountController,
  bannedUserController,
  changePasswordController,
  deleteUserController,
  forgetPasswordController,
  loginController,
  registerController,
  requestTokenController,
  resetPasswordController,
  validateTokenController,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = express.Router();

authRouter.post("/login", loginController);
authRouter.post("/register", authMiddleware, registerController);
authRouter.post("/request-token", requestTokenController);
authRouter.post("activation", activateAccountController);
authRouter.get("/validate-token/:token", validateTokenController);
authRouter.post("/forget-password", forgetPasswordController);
authRouter.put("/reset-password/:token", resetPasswordController);
authRouter.put("/change-password", changePasswordController);
authRouter.delete("/banned/:id", bannedUserController);
authRouter.delete("/delete/:id", deleteUserController);

export default authRouter;
