import bcrypt from "bcrypt";

import { UserEntity } from "../entities/user.entity";
import { getManager } from "typeorm";

export async function getUserByEmailOrUsername(usernameOrEmail: string): Promise<UserEntity> {
    const entityManager = getManager();
    const result = await entityManager.findOne( UserEntity, {
        where: [
            { email: usernameOrEmail },
            { username: usernameOrEmail }
        ],
        relations: [ "role", "role.permissions" ],
        select: {
            role: {
                code: true
            }
        }
    });
    console.log(result)
    return result
}

export async function validatePassword(user:UserEntity, password: string): Promise<boolean>{
    return bcrypt.compare(password, user.password)
}