import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BiodataEntity } from "./biodata.model";
import { IDepartment } from "src/entities/department.entity";

@Entity("departments")
export class DepartmentEntity implements IDepartment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column()
  slug: string;

  @Column()
  is_active: boolean;

  @Column({ nullable: false })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @OneToMany(() => BiodataEntity, (biodata) => biodata.department)
  biodata: BiodataEntity[];

  @BeforeInsert()
    updateDates() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}
