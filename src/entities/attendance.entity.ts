import { IBiodata } from "./biodata.entity";

export interface IAttendance {
  id?: string;
  employee?: string
  checkin?: Date;
  checkout?: Date;
  evidence?: string;
  at_office?: boolean;

  biodata: IBiodata;
}