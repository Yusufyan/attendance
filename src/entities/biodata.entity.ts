import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { DepartmentEntity } from "./department.entity";
import { CompanyEntity } from "./company.entity";
import { AttendanceEntity } from "./attendance.entity";

@Entity("biodatas")
export class BiodataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  uuid: string;

  @Column({ length: 10 })
  employee_id: string;

  @Column({ length: 50 })
  employee_type: string;

  @Column({ length: 50 })
  designation: string;

  @Column({ length: 100, nullable: false })
  fullname: string;

  @Column()
  address: string;

  @Column({ length: 13, nullable: false })
  phone: string;

  @Column({ length: 20 })
  city_of_birth: string;

  @Column()
  date_of_birth: string;

  @Column({ length: 13 })
  emergency_contact: string;

  @Column()
  joined_at: Date;

  @Column({ length: 2, default: "12" })
  permit_quota: string;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.uuid)
  attandances: AttendanceEntity[];

  //User Relation
  @OneToOne(() => UserEntity, (user) => user.uuid, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({
    name: "user",
    referencedColumnName: "uuid",
  })
  user: UserEntity;

  //Company Relation
  @ManyToOne(() => CompanyEntity, (company) => company.uuid, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({
    name: "company",
    referencedColumnName: "uuid",
  })
  company: CompanyEntity;

  //Department Relation
  @ManyToOne(() => DepartmentEntity, (department) => department.uuid, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({
    name: "department",
    referencedColumnName: "uuid",
  })
  department: DepartmentEntity;
}
