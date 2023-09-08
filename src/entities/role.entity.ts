import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class RoleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    uuid: string;

    @Column({ length: 20, nullable: false })
    name: string;

    @Column({ length: 5 })
    code: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ nullable: true })
    updated_at: Date;
}