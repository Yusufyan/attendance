import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.model";
import { DepartmentEntity } from "./department.model";
import { CompanyEntity } from "./company.model";
import { AttendanceEntity } from "./attendance.model";
import { IBiodata } from "src/entities/biodata.entity";

@Entity("biodatas")
export class BiodataEntity implements IBiodata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10 })
  employee_id: string;

  @Column({ length: 50, nullable: true })
  employee_type: string;

  @Column({ length: 50, nullable: true })
  designation: string;

  @Column({ length: 100, nullable: true })
  fullname: string;

  @Column({nullable: true})
  address: string;

  @Column({ length: 13, nullable: false })
  phone: string;

  @Column({ length: 20, nullable: true })
  city_of_birth: string;

  @Column({ nullable: true })
  date_of_birth: string;

  @Column({ length: 13, nullable: true })
  emergency_contact: string;

  @Column({ nullable: true })
  joined_at: string;

  @Column({ length: 2, default: "12" })
  permit_quota: string;

  @CreateDateColumn({ nullable: false})
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.id)
  attendances: AttendanceEntity[];

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
    nullable: true,
  })
  @JoinColumn({
    name: "department",
    referencedColumnName: "id",
  })
  department: DepartmentEntity;

  @BeforeInsert()
    updateDates() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}
