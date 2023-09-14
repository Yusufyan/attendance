
import { v4 } from "uuid";
import { DepartmentEntity } from "../entities/department.entity";
import { getManager } from "typeorm";
import { CreateDepartmentDTO } from "../dtos/department.dto";

export async function genDepartment(body: CreateDepartmentDTO): Promise<DepartmentEntity> {
    const entityManager = getManager();
    const department = await entityManager.save( DepartmentEntity, {
        uuid: v4(),
        name: body.name
    })
    return department
}

