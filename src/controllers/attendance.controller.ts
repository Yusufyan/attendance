import { Response } from "express";
import { ValidationError } from "joi";
import ApiError from "../configs/api-error.config";
import { checkinRequestDTO, checkoutRequestDTO } from "../dtos/attendance.dto";
import { AuthRequest } from "../middlewares/auth.middleware";
import { checkinService, checkoutService } from "../services/attendance.service";

export async function checkinController(req: AuthRequest, res: Response){
  try {
    const body = req.body as checkinRequestDTO
    const checkin = await checkinService(body, req.userId);

    return res.success('Checkin Success', checkin)
  } catch (error) {
    if (error instanceof ApiError) {
      res.error(error.status, error.message);
    } else if (error instanceof ValidationError) {
      const errorMessages = error.details.map((err) => err.message);
      console.log(error);
      res.error(400, errorMessages);
    } else {
      console.log(error);
      res.error(500, "Internal Server Error");
    }
  }
}

export async function checkoutController(req: AuthRequest, res: Response) {
  try {
    const body = req.body as checkoutRequestDTO
    const checkout = await checkoutService(body, req.userId)

    return res.success('Checkout Success', checkout)
  } catch (error) {
    if (error instanceof ApiError) {
      res.error(error.status, error.message);
    } else if (error instanceof ValidationError) {
      const errorMessages = error.details.map((err) => err.message);
      console.log(error);
      res.error(400, errorMessages);
    } else {
      console.log(error);
      res.error(500, "Internal Server Error");
    }
  }
}
