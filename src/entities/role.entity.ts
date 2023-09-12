import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PermissionEntity } from "./permission.entity";
import { UserEntity } from "./user.entity";

@Entity("roles")
export class RoleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    uuid: string;

    @Column({ length: 20, nullable: false })
    name: string;

    @Column({ length: 5, unique: true })
    code: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ nullable: true })
    updated_at: Date;

    @OneToMany(() => UserEntity, (user) => user.role, { cascade: true })
    user: UserEntity[];

    @ManyToMany(() => PermissionEntity, { cascade: true })
    @JoinTable({
        name: 'role_permission',
        joinColumn: { 
            name: 'role',
            referencedColumnName: 'uuid' 
        },
        inverseJoinColumn: {
            name: 'permission',
            referencedColumnName: 'uuid'
        }
    })
    permissions: PermissionEntity[];
}