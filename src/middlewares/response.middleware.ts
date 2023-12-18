import { NextFunction, Request, Response } from "express"

declare global {
  namespace Express{
    interface Response {
      success(message: string, data: any): Response;
      error(statusCode: number, message: string | string[]): Response;
    }
  }
}

export function ResponseHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.success = function (message: string, data: any): Response {
    return res.status(200).json({
      statusCode: 200,
      message: message,
      data,
    })
  }

  res.error = function (statusCode: number, message: string | string[]): Response {
    return res.status(statusCode).json({
      statusCode,
      message,
      data: []
    })
  }
  next()
}
