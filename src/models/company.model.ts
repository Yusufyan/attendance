import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BiodataEntity } from "./biodata.model";

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

  @Column({ nullable: false})
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
  pic: BiodataEntity;

  @OneToMany(() => BiodataEntity, (biodata) => biodata.company)
  biodatas: BiodataEntity;

  @BeforeInsert()
    updateDates() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}
