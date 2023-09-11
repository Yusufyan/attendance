import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("attendances")
export class AttendanceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    uuid: string;

    @Column({ length: 50 })
    employee: string;
    
    @Column()
    checkin: Date;

    @Column()
    checkout: Date;

    @Column()
    evidence: string;

    @Column()
    at_office: boolean;

}