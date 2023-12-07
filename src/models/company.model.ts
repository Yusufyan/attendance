import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Biodata } from "./biodata.model";

@Entity("mst_companies")
export class Company {
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

  @OneToOne(() => Biodata, (biodata) => biodata.id, {
    nullable: false,
  })
  @JoinColumn({
    name: "biodata",
    referencedColumnName: "id",
  })
  pic: Biodata;

  @OneToMany(() => Biodata, (biodata) => biodata.company)
  biodatas: Biodata;

  @BeforeInsert()
    updateDates() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}
