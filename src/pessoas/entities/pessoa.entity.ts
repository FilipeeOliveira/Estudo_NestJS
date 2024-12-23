
import { IsEmail } from "class-validator";
import { RecadoEntity } from "../../recados/entities/recado.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  @IsEmail()
  email: string

  @Column({ length: 255 })
  passwordHash: string

  @Column({ length: 100 })
  nome: string

  @CreateDateColumn()
  createAt?: Date

  @UpdateDateColumn()
  updateAt?: Date

  //Uma pessoa pode ter enviado muitos recados (como "de")
  //Esses recados sao relacionados ao campo "de" na entidade recado
  @OneToMany(() => RecadoEntity, RecadoEntity => RecadoEntity.de)
  recadosEnviados: RecadoEntity[]

  //Uma pessoa pode ter recebido muitos recados (como "para")
  //Esses recados sao relacionados ao campo "para" na entidade recado
  @OneToMany(() => RecadoEntity, RecadoEntity => RecadoEntity.para)
  recadosRecebidos: RecadoEntity[]

  @Column({ default: true })
  active: boolean

  @Column({ default: '' })
  picture: string

}

