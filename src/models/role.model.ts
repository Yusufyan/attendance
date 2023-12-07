import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Permission } from "./permission.model";
import { User } from "./user.model";
import { IRole } from "src/entities/role.entity";

@Entity("mst_roles")
export class Role implements IRole {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 20, nullable: false })
  name: string;

  @Column({ length: 8, unique: true })
  code: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: false })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @OneToMany(() => User, (user) => user.role, { cascade: true })
  user: User[];

  @ManyToMany(() => Permission, { cascade: true })
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
  permissions: Permission[];

  @BeforeInsert()
    updateDates() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}
