import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BiodataEntity } from "./biodata.entity";

@Entity("companies")
export class CompanyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    uuid: string;

    @Column({ length: 50 })
    hr: string;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column()
    address: string;

    @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ nullable: true })
    updated_at: Date;

    @OneToMany(() => BiodataEntity, (biodata) => biodata.companies )
    biodata: BiodataEntity;
    
}