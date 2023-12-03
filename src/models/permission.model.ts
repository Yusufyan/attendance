import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BeforeInsert } from "typeorm";
import { RoleEntity } from "./role.model";
import { IPermission } from "src/entities/permission.entity";

@Entity("permissions")
export class PermissionEntity implements IPermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, nullable: false })
  name: string;

  @Column({ nullable: false, default: true })
  is_active: boolean;

  @Column({ nullable: false })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  role: RoleEntity[];

  @BeforeInsert()
    updateDates() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}
