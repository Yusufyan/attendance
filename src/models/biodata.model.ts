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
import { User } from "./user.model";
import { DepartmentEntity } from "./department.model";
import { Company } from "./company.model";
import { Attendances } from "./attendance.model";
import { IBiodata } from "src/entities/biodata.entity";
import { Designation } from "./designation.model";

@Entity("biodatas")
export class Biodata implements IBiodata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10 })
  employee_id: string;

  @Column({ length: 50, nullable: true })
  employee_type: string;

  @Column({ nullable: true })
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

  @OneToMany(() => Attendances, (attendance) => attendance.id)
  attendances: Attendances[];

  //User Relation
  @OneToOne(() => User, (user) => user.id, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({
    name: "user",
    referencedColumnName: "id",
  })
  user: User;

  // Designation Relation
  @ManyToOne(() => Designation, (designation) => designation.id, {
    cascade: false,
    nullable: true,
  })
  @JoinColumn({
    name: "designation",
    referencedColumnName: "id"
  })
  usedDesignation: Designation
  
  //Company Relation
  @ManyToOne(() => Company, (company) => company.id, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({
    name: "company",
    referencedColumnName: "id",
  })
  company: Company;

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
