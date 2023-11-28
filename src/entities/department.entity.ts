import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BiodataEntity } from "./biodata.entity";

@Entity("departments")
export class DepartmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column()
  slug: string;

  @Column()
  is_active: boolean;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @OneToMany(() => BiodataEntity, (biodata) => biodata.department)
  biodata: BiodataEntity[];
}
