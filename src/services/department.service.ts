import { v4 } from "uuid";
import { DepartmentEntity } from "../entities/department.entity";
import { getManager } from "typeorm";
import { CreateDepartmentDTO } from "../dtos/department.dto";
import slugify from "slugify";

export async function genDepartment(
  body: CreateDepartmentDTO
): Promise<DepartmentEntity> {
  const entityManager = getManager();
  return entityManager.save(DepartmentEntity, {
    uuid: v4(),
    name: body.name,
    slug: slugify(body.name.toLowerCase(), "-"),
  });
}

export async function getAllDepartment(): Promise<DepartmentEntity[]> {
  const entityManager = getManager();
  return entityManager.find(DepartmentEntity);
}

export async function getDepartmentByName(
  slug: string
): Promise<DepartmentEntity> {
  const entityManager = getManager();
  return entityManager.findOne(DepartmentEntity, {
    where: { slug },
  });
}

export async function updateDepartment(
  id: number,
  name: string
): Promise<DepartmentEntity | undefined> {
  const entityManager = getManager();
  const department = await entityManager.findOne(DepartmentEntity, {
    where: { id },
  });
  if (department) {
    department.name = name || department.name;
    department.slug = slugify(name.toLocaleLowerCase()) || department.slug;
    return await entityManager.save(department);
  }
  return undefined;
}

export async function deleteDepartment(id: number): Promise<boolean> {
  const entityManager = getManager();
  const department = await entityManager.findOne(DepartmentEntity, {
    where: { id },
  });
  if (department) {
    await entityManager.remove(department);
    return true;
  }
  return false;
}
