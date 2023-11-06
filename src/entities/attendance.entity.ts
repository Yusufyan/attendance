import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BiodataEntity } from "./biodata.entity";

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

  @ManyToOne(() => BiodataEntity, (biodata) => biodata.uuid, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({
    name: "biodata",
    referencedColumnName: "uuid",
  })
  biodata: BiodataEntity;
}
