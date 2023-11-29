import { IBiodata } from "./biodata.entity";

export interface ICompany {
  id?: string;
  hr?: string;
  name?: string;
  slug?: string;
  address?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;

  biodatas: IBiodata;
}
