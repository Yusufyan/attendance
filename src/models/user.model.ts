import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { Role } from "./role.model";
import { Token } from "./token.model";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "src/entities/user.entity";

@Entity("mst_users")
export class User implements IUser {
  @PrimaryGeneratedColumn("uuid")
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

  @Column({ nullable: false })
  role: string;
  
  //Token Relation
  @OneToMany(() => Token, (token) => token.user, { cascade: true })
  tokens: Token[];

  //Role Relation
  @ManyToOne(() => Role, (role) => role.code, {
    nullable: false,
  })
  @JoinColumn({
    name: "role",
    referencedColumnName: "code",
  })
  userRole: Role;

  @BeforeInsert()
    updateDates() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}
