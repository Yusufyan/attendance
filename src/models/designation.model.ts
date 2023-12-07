import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Biodata } from "./biodata.model";
import { IDesignation } from "../entities/designation.entity";

@Entity('mst_designation')
export class Designation implements IDesignation{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false, unique: true })
  name: string;

  @CreateDateColumn({ nullable: false})
  created_at: Date

  @UpdateDateColumn({ nullable: true})
  updated_at: Date

  @OneToMany(() => Biodata, (biodata) => biodata.designation)
  userBiodatas: Biodata[]
}
