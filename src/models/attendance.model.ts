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
import { User } from "./user.model";

@Entity("attendances")
export class Attendances implements IAttendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  coordinatesIn: string;

  @Column({nullable: true})
  coordinatesOut: string;

  @Column()
  checkin: Date;

  @Column({ nullable: true})
  checkout: Date;

  @Column({ nullable: true })
  evidence: string;

  @Column()
  at_office: boolean;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({
    name: "employee",
    referencedColumnName: "id",
  })
  employee: User;
}
