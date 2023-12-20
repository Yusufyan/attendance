import { IUser } from "./user.entity";

export interface IAttendance {
  id?: string;
  // employee?: string
  coordinatesIn?: string
  coordinatesOut?: string
  checkin?: Date;
  checkout?: Date;
  evidence?: string;
  at_office?: boolean;
  created_at?: Date;
  updated_at?: Date;

  employee: IUser;
}