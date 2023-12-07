import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BeforeInsert } from "typeorm";
import { Role } from "./role.model";
import { IPermission } from "src/entities/permission.entity";

@Entity("mst_permissions")
export class Permission implements IPermission {
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

  @ManyToMany(() => Role, (role) => role.permissions)
  role: Role[];

  @BeforeInsert()
    updateDates() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}
