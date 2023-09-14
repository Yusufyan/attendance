import { Request, Response } from "express";

import { DepartmentEntity } from "../entities/department.entity";
import { genDepartment } from "../services/department.service";
import { CreateDepartmentDTO } from "../dtos/department.dto";
import { AppException } from "../utils/exception.util";

export async function createDepartment(req: Request, res: Response) {
    try {
        const body = req.body as CreateDepartmentDTO;

        const createDepartment = await genDepartment(body)
        res.status(200).json({ message: "Success. Department added", data: createDepartment });
    } catch (error) {
        res.status(500).json({ error: "Interal server error"})
    }
}
