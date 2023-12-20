import express from "express";
import { checkinController, checkoutController } from "../controllers/attendance.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const attendRouter = express.Router()

attendRouter.post("/checkin", authMiddleware, checkinController)
attendRouter.post("/checkout", authMiddleware, checkoutController)

export default attendRouter;