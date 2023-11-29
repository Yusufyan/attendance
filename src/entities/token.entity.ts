import { IUser } from "./user.entity";

export interface IToken {
  id?: string;
  token?: string;
  is_active?: boolean;
  expired_in?: Date;
  created_at?: Date;
  updated_at?: Date;

  user: IUser
}