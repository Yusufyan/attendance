import { IAttendance } from "./attendance.entity";
import { ICompany } from "./company.entity";

export interface IBiodata {
  id?: string;
  employee_id?: string;
  employee_type?: string;
  designation?: string;
  fullname?: string;
  address?: string;
  phone?: string;
  city_of_birth?: string;
  date_of_birth?: string;
  emergency_contact?: string;
  joined_at?: string;
  permit_quota?: string;
  created_at?: Date;
  updated_at?: Date;

  company: ICompany;
  attendances: IAttendance[];
}
