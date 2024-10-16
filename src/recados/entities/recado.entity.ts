import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RecadoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  texto: string;

  @Column({ default: false }) //to definindo um valor padrao, que vai ser um false
  lido: boolean;

  @Column()
  data: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;

  //Muitos recados podem ser enviados por uma unica pessoa (Emissor)
  @ManyToOne(() => Pessoa)
  //Especifica a coluna "de" que armazena o ID da pessoa que enviou o recado
  @JoinColumn({ name: 'de' })
  de: Pessoa;

  //Muitos recados podem ser enviados para uma unica pessoa (Destinatario)
  @ManyToOne(() => Pessoa)
  //Especifica a coluna "para" que armazena o ID da pessoa que recebeu o recado
  @JoinColumn({ name: 'para' })
  para: string;
}
