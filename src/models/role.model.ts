import {
  Column,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PermissionEntity } from "./permission.model";
import { UserEntity } from "./user.model";
import { IRole } from "src/entities/role.entity";

@Entity("roles")
export class RoleEntity implements IRole {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 20, nullable: false })
  name: string;

  @Column({ length: 8, unique: true })
  code: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @OneToMany(() => UserEntity, (user) => user.role, { cascade: true })
  user: UserEntity[];

  @ManyToMany(() => PermissionEntity, { cascade: true })
  @JoinTable({
    name: "role_permission",
    joinColumn: {
      name: "role",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "permission",
      referencedColumnName: "id",
    },
  })
  permissions: PermissionEntity[];
}
