import { IUser } from "./user.entity";

export enum PToken{
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
  RESET_PASSWROD = "RESET_PASSWROD"
}

export interface IToken {
  id?: string;
  token?: string;
  is_active?: boolean;
  purpose?: PToken;
  expired_in?: Date;
  created_at?: Date;
  updated_at?: Date;

  user: IUser
}