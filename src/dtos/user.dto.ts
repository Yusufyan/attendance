export interface LoginUserDTO {
  emailOrUsername: string
  password: string
}

export interface RegisUserDTO {
  email: string
  name: string
  fullname: string
  phone: string
  password: string
  role: string
}

export interface ForgetPasswordDTO {
  email: string
}

export interface ResetPasswordDTO {
  password: string
  confirmPassword: string
}

export interface ChangePasswordDTO {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
