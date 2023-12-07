import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Biodata } from "./biodata.model";
import { IAttendance } from "src/entities/attendance.entity";

@Entity("attendances")
export class Attendances implements IAttendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  employee: string;

  @Column({ length: 25 })
  coordinate: string;

  @Column()
  checkin: Date;

  @Column()
  checkout: Date;

  @Column()
  evidence: string;

  @Column()
  at_office: boolean;

  @ManyToOne(() => Biodata, (biodata) => biodata.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({
    name: "biodata",
    referencedColumnName: "id",
  })
  biodata: Biodata;
}
