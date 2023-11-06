import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { RoleEntity } from "./role.entity";

@Entity("permissions")
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  uuid: string;

  @Column({ length: 20, nullable: false })
  name: string;

  @Column({ nullable: false, default: true })
  is_active: boolean;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  role: RoleEntity[];
}
