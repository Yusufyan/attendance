
import { v4 } from "uuid";
import { DepartmentEntity } from "../entities/department.entity";
import { getManager } from "typeorm";
import { CreateDepartmentDTO, GetDepartmentByNameDTO } from "../dtos/department.dto";

export async function genDepartment(body: CreateDepartmentDTO): Promise<DepartmentEntity> {
    const entityManager = getManager();
    const create = await entityManager.save( DepartmentEntity, {
        uuid: v4(),
        name: body.name
    })
    return create
}

export async function getAllDepartment(): Promise<DepartmentEntity[]> {
    const entityManager = getManager();
    return entityManager.find(DepartmentEntity)
}

export async function getDepartmentByName(slug: string): Promise<DepartmentEntity> {
    const entityManager = getManager();
    return entityManager.findOne(DepartmentEntity, {
      where: { slug }
    })
}

