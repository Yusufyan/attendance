import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BiodataEntity } from "./biodata.entity";

@Entity("companies")
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  hr: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column()
  slug: string;

  @Column()
  address: string;

  @Column()
  is_active: boolean;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @OneToOne(() => BiodataEntity, (biodata) => biodata.id, {
    nullable: false,
  })
  @JoinColumn({
    name: "biodata",
    referencedColumnName: "id",
  })
  biodata: BiodataEntity;

  @OneToMany(() => BiodataEntity, (biodata) => biodata.company)
  biodatas: BiodataEntity;
}
