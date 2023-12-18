import { Request, Response } from "express";
import { ChangePasswordDTO, ForgetPasswordDTO, LoginUserDTO, RegisUserDTO, ResetPasswordDTO } from "../dtos/user.dto";
import { activateAccountService, bannedUserService, changePasswordService, deleteUserService, forgetPasswordService, generateOTPService, loginService, registerService, resetPasswordService, validateTokenService,  } from "../services/auth.service";
import { logging } from "../utils/logging.util";
import ApiError from "../configs/api-error.config";
import { ValidationError } from 'joi'
import { AuthRequest } from "src/middlewares/auth.middleware";

export async function loginController(req: Request, res: Response) {
  try {
    const body = req.body as LoginUserDTO;
    const user = await loginService(body);

    return res.success("Login Successfully", user )
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

export async function registerController(req: Request, res: Response) {
  try {
    const body = req.body as RegisUserDTO;
    const user = await registerService(body);

    res.success("Register User Success, please check you email", user)
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

export async function requestTokenController(req: AuthRequest, res: Response) {
  try {
    const token = await generateOTPService(req.body.email, req.userId.toString())
    
    res.success("Generate Token Sucess", token)
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

export async function activateAccountController(req: Request, res: Response) {
  try {
    const validateToken = await activateAccountService(req.body.token)

    return res.success('Validate User Successfully', validateToken)
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

export async function validateTokenController(req: Request, res: Response){
  try {
    const validateToken = await validateTokenService(req.params.token);
    
    return res.success('Validate User Successfully', validateToken);
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

export async function forgetPasswordController(req: Request, res: Response) {
  try {
    const body = req.body as ForgetPasswordDTO
    const forgetPassword = await forgetPasswordService(body.email)

    return res.success('Send OTP For Reset Password', forgetPassword);
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

export async function resetPasswordController(req: Request, res: Response) {
  try {
    const { token } = req.params;
    const body = req.body as ResetPasswordDTO
    const resetPassword = await resetPasswordService(body, token)

    return res.success('Reset Password Successfully', resetPassword)
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

export async function changePasswordController(req: AuthRequest, res: Response) {
  try {
    const body = req.body as ChangePasswordDTO
    const changePassword = await changePasswordService(req.userId, body)

    return res.success('Change Password Successfully', changePassword)
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

export async function bannedUserController(req: Request, res: Response) {
  try {
    const {id} = req.params
    await bannedUserService(id)
    return res.success('Banned User Successfully', '')
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

export async function deleteUserController(req: Request, res: Response) {
  try {
    const {id} = req.params
    await deleteUserService(id)
    return res.success('Delete User Successfully', '')
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

export async function logoutController(req: AuthRequest, res: Response) {
  delete req.userId
  delete req.roleId
  return res.success('Logout Successfully','')
}