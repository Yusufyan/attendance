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
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.id)
  attandances: AttendanceEntity[];

  //User Relation
  @OneToOne(() => UserEntity, (user) => user.id, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({
    name: "user",
    referencedColumnName: "id",
  })
  user: UserEntity;

  //Company Relation
  @ManyToOne(() => CompanyEntity, (company) => company.id, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({
    name: "company",
    referencedColumnName: "id",
  })
  company: CompanyEntity;

  //Department Relation
  @ManyToOne(() => DepartmentEntity, (department) => department.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({
    name: "department",
    referencedColumnName: "id",
  })
  department: DepartmentEntity;
}
