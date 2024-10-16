import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class RecadoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })

  texto: string;
  @Column({ type: 'varchar', length: 50 })

  de: string;
  @Column({ type: 'varchar', length: 50 })
  para: string;

  @Column({ default: false }) //to definindo um valor padrao, que vai ser um false
  lido: boolean;

  @Column()
  data: Date;

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updateAt?: Date
}
