import { DepartmentEntity } from "../models/department.model";
import { getManager } from "typeorm";
import { CreateDepartmentDTO } from "../dtos/department.dto";
import { Response } from "../helpers/response.helper";
import slugify from "slugify";

export async function genDepartment(
  body: CreateDepartmentDTO
): Promise<any> {
  const entityManager = getManager();
  const existDepartment = await entityManager.findOne(DepartmentEntity, {
    where: { name: body.name }
  })

  if(existDepartment) return Response(409, 'Department Data Duplicate', '')

  return entityManager.save(DepartmentEntity, {
    name: body.name,
    slug: slugify(body.name.toLowerCase(), "-"),
    is_active: true,
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
  id: any,
  name: string
): Promise<DepartmentEntity | boolean> {
  const entityManager = getManager();
  const department = await entityManager.findOne(DepartmentEntity, {
    where: { id },
  });
  if (department) {
    department.name = name || department.name;
    department.slug = slugify(name.toLocaleLowerCase()) || department.slug;
    return await entityManager.save(department);
  }
  return false;
}

export async function softDeleteDepartment(id: any): Promise<any> {
  const entityManager = getManager();
  const department = await entityManager.findOne(DepartmentEntity, {
    where: { id },
  });
  if (department) {
    return await entityManager.update(DepartmentEntity, id, {
      is_active: false,
    });
  }
  return false;
}

export async function deleteDepartment(id: string): Promise<any> {
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
