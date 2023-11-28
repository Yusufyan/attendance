import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { RoleEntity } from "./role.entity";
import { TokenEntity } from "./token.entity";
import { v4 as uuidv4 } from 'uuid'
@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  email: string;

  @Column({ length: 100, nullable: false })
  username: string;

  @Column()
  slug: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  //Token Relation
  @OneToMany(() => TokenEntity, (token) => token.user, { cascade: true })
  tokens: TokenEntity[];

  //Role Relation
  @ManyToOne(() => RoleEntity, (role) => role.code, {
    nullable: false,
  })
  @JoinColumn({
    name: "role",
    referencedColumnName: "code",
  })
  role: RoleEntity;
}
