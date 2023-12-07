import { IBiodata } from "./biodata.entity";

export interface IDesignation {
  id?: string;
  name?: string;
  created_at?: Date;
  updated_at?: Date;

  userBiodatas: IBiodata[];
}
