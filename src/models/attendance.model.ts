import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BiodataEntity } from "./biodata.model";
import { IAttendance } from "src/entities/attendance.entity";

@Entity("attendances")
export class AttendanceEntity implements IAttendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToOne(() => BiodataEntity, (biodata) => biodata.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({
    name: "biodata",
    referencedColumnName: "id",
  })
  biodata: BiodataEntity;
}
