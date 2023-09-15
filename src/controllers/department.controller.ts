import { Request, Response } from "express";

import { DepartmentEntity } from "../entities/department.entity";
import { genDepartment, getDepartmentByName } from "../services/department.service";
import { CreateDepartmentDTO, GetDepartmentByNameDTO } from "../dtos/department.dto";
import { AppException } from "../utils/exception.util";

export async function createDepartmentController(req: Request, res: Response) {
    try {
        const body = req.body as CreateDepartmentDTO;

        const createDepartment = await genDepartment(body)
        res.status(200).json({ message: "Success. Department added", data: createDepartment });
    } catch (error) {
        res.status(500).json({ error: "Interal server error"})
    }
}

export async function getDepartmentByNameCont(req: Request, res: Response) {
    try {
        const body = req.body
        const response = getDepartmentByName(body)

        res.status(200).json({ message: "Success.", data: response})
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}
