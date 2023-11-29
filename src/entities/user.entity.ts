import { IRole } from "./role.entity";
import { IToken } from "./token.entity";

export interface IUser {
  id?: string;
  email?: string;
  username?: string;
  slug?: string;
  password?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
  
  tokens: IToken[]
  role: IRole
}