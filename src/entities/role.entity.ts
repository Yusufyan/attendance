import { IPermission } from "./permission.entity";

export interface IRole {
  id?: string;
  name?: string;
  code?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;

  // user: IUser
  permissions: IPermission[]
}