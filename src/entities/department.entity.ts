import { IBiodata } from "./biodata.entity"

export interface IDepartment {
  id?: string
  name?: string
  slug?: string
  is_active?: boolean
  created_at?: Date
  updated_at?: Date

  biodata: IBiodata[]
}