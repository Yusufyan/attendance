import { IRole } from "./role.entity"

export interface IPermission {
  id?: string
  name?: string
  is_active?: boolean
  created_at?: Date
  updated_at?: Date
  
  role: IRole[]
}