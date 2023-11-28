export interface LoginUserDTO {
  emailOrUsername: string
  password: string
}

export interface RegisUserDTO {
  email: string
  username: string
  password: string
  role: number
}