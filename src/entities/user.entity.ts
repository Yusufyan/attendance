import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { RoleEntity } from "./role.entity";
import { TokenEntity } from "./token.entity";

@Entity("users")
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    uuid: string;

    @Column({ length: 100, nullable: false })
    email: string;

    @Column({ length: 100, nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ nullable: true })
    updated_at: Date;
    
    @OneToMany(() => TokenEntity, (token) => token.user, { cascade: true })
    tokens: TokenEntity[];

    @ManyToOne(() => RoleEntity, (role) => role.code, {
        nullable: false
    })
    @JoinColumn({
        name: 'role',
        referencedColumnName: 'code'
    })
    role: RoleEntity;
}