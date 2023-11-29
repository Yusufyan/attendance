import { getConnection, getRepository } from "typeorm";
import bcrypt from "bcrypt";

import { RoleEntity } from "../models/role.model";
import { PermissionEntity } from "../models/permission.model";
import { UserEntity } from "../models/user.model";
import { v4 } from "uuid";
import slugify from "slugify";

export const RolePermission = async () => {
  const connection = getConnection();

  const roleEntityMetadata = connection.getMetadata(RoleEntity);
  const permissionEntityMetadata = connection.getMetadata(PermissionEntity);
  const userEntityMetadata = connection.getMetadata(UserEntity);

  const roleRepository = getRepository(RoleEntity);
  const permissionRepository = getRepository(PermissionEntity);
  const userRepository = getRepository(UserEntity);

  await roleRepository.delete({});
  await permissionRepository.delete({});
  await userRepository.delete({});

  const roleTable = roleEntityMetadata.tableName;
  const permissionTable = permissionEntityMetadata.tableName;
  const userTable = userEntityMetadata.tableName;

  await connection.query(
    `TRUNCATE TABLE ${roleTable} RESTART IDENTITY CASCADE`
  );

  await connection.query(
    `TRUNCATE TABLE ${permissionTable} RESTART IDENTITY CASCADE`
  );

  await connection.query(
    `TRUNCATE TABLE ${userTable} RESTART IDENTITY CASCADE`
  );

  const permissionNameList = [
    "create:role",
    "read:role",
    "update:role",
    "delete:role",
    "create:permission",
    "read:permission",
    "update:permission",
    "delete:permission",
    "create:user",
    "read:user",
    "update:user",
    "delete:user",
    "create:department",
    "read:department",
    "update:department",
    "delete:department",
    "create:company",
    "read:company",
    "update:company",
    "delete:company",
    "create:biodata",
    "read:biodata",
    "update:biodata",
    "delete:biodata",
    "create:attendance",
    "read:attendance",
    "update:attendance",
    "delete:attendance",
  ];

  const permissionNameListHR = [
    "create:user",
    "read:user",
    "update:user",
    "delete:user",
    "create:department",
    "read:department",
    "update:department",
    "delete:department",
    "create:biodata",
    "read:biodata",
    "update:biodata",
    "delete:biodata",
    "create:attendance",
    "read:attendance",
    "update:attendance",
    "delete:attendance",
  ];

  const permissionNameListEmployee = [
    "create:user",
    "read:user",
    "update:user",
    "delete:user",
    "create:department",
    "read:department",
    "update:department",
    "delete:department",
    "create:biodata",
    "read:biodata",
    "update:biodata",
    "delete:biodata",
    "create:attendance",
    "read:attendance",
    "update:attendance",
    "delete:attendance",
  ];

  let permissionId = [];
  let permissionIdHR = [];
  let permissionIdEmpl = [];

  for (const permissionName of permissionNameList) {
    const permission = await permissionRepository.save({
      name: permissionName,
    });

    permissionId.push(permission);
  }

  for (const permissionName of permissionNameListHR) {
    const permission = await permissionRepository.save({
      name: permissionName,
    });

    permissionIdHR.push(permission);
  }

  for (const permissionName of permissionNameListEmployee) {
    const permission = await permissionRepository.save({
      name: permissionName,
    });

    permissionIdEmpl.push(permission);
  }

  const role = await roleRepository.save({
    name: "Super Admin",
    code: "SPRDMN",
    permissions: permissionId,
  });

  await roleRepository.save({
    name: "HR",
    code: "HR",
    permissions: permissionIdHR,
  });

  await roleRepository.save({
    name: "Employee",
    code: "MPLY",
    permissions: permissionIdEmpl,
  });

  const name = "Tuna Salem";
  const user = await userRepository.save({
    uuid: v4(),
    email: "tunasalem@gmail.com",
    username: "tunasalem13",
    password: await bcrypt.hash("Password01", 10),
    slug: slugify(name, "-").toLowerCase(),
    phone: "081810180801",
    role: role,
  });

  console.log("Seeding database tables");
};
