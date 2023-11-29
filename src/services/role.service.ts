import { RoleRequestDTO } from "src/dtos/role.dto";
import { RoleEntity } from "src/models/role.model";
import { getManager } from "typeorm";
import { v4 } from "uuid";

export async function createRole(body: RoleRequestDTO): Promise<any> {
  const entityManager = getManager()
  const exist = await entityManager.findOne(RoleEntity, {
    where: { name: body.name }
  })
  
  if (exist) return "Role already exists"

  const data = await entityManager.save(RoleEntity, {
    uuid: v4(),
    name: body.name,
    code: body.code
  })
  return data
}

export async function updateRole(body: RoleRequestDTO): Promise<any> {
  const entityManager = getManager()
  const exist = await entityManager.findOne(RoleEntity, {
    where: { name: body.name }
  })
  
  if (!exist) return "No role found"

  const data = await entityManager.save(RoleEntity, {
    uuid: exist.uuid,
    name: body.name,
    code: body.code
  })
  return data
}

export async function getAllRole(): Promise<RoleEntity[]> {
  const entityManager = getManager()
  return entityManager.find(RoleEntity)
}


