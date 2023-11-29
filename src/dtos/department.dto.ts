import { Request } from "express";

export class CreateDepartmentDTO {
  name: string;
}

export class GetDepartmentByNameDTO {
  name: string;
}

export class UpdDepartmentByNameDTO {
  name: string;
}
