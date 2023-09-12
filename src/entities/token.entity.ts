import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("tokens")
export class TokenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    uuid: string;

    @Column()
    token: string;

    @Column({ default: true })
    is_active: boolean

    @Column()
    expired_in: Date;
    
    @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ nullable: true })
    updated_at: Date;

    @ManyToOne(() => UserEntity, (user) => user.uuid, {
        nullable: false
    })
    @JoinColumn({
        name: 'user',
        referencedColumnName: 'uuid'
    })
    user: UserEntity;

}