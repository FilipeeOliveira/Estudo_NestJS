import { Injectable } from '@nestjs/common';
import { RecadoEntity } from './entities/recado.entity';

@Injectable()
export class RecadosService {
  private lastId = 1;
  private recados: RecadoEntity[] = [
    {
      id: 1,
      texto: 'Este é um recado de test',
      de: 'Joana',
      para: 'Joao',
      lido: false,
      data: new Date(),
    },
  ];

  findAll() {
    return this.recados
  }

  findOne(id: string) {
    return this.recados.find(item => item.id === +id) //para comverter o id string em number uso o +(mais) antes
  }

}
