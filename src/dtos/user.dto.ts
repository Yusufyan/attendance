export interface LoginUserDTO {
  emailOrUsername: string
  password: string
}

export interface RegisUserDTO {
  email: string
  name: string
  phone: number
  password: string
  role: number
}