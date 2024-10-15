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
    // o find() Procura o primeiro item de um array que atende a uma condição e te dá esse item.
    return this.recados.find(item => item.id === +id) //para comverter o id string em number uso o +(mais) antes
  }


  create(body: any) {
    this.lastId++
    const id = this.lastId
    const novoRecado = {
      id,
      ...body
    }
    this.recados.push(novoRecado)

    return novoRecado
  }

  update(id: string, body: any) {
    const recadoExistenteIndex = this.recados.findIndex(
      item => item.id === +id
    )
    if (recadoExistenteIndex >= 0) {
      //ele pega o recado que foi encontrado no índice recadoExistenteIndex e o armazena na variável recadoExistente.
      const recadoExistente = this.recados[recadoExistenteIndex]
      //cria um novo objeto que combina as propriedades do recadoExistente com as novas propriedades fornecidas em body.
      //Isso significa que as propriedades em body vão sobrescrever as existentes em recadoExistente, se houver alguma que tenha o mesmo nome.
      this.recados[recadoExistenteIndex] = {
        ...recadoExistente,
        ...body
      }

    }
  }

  remove(id: string) {
    // o findIndex() basicamente encontra e retornar o indice
    const recadosExistenteIndex = this.recados.findIndex(
      item => item.id === +id,
    )
    if (recadosExistenteIndex >= 0) {
      this.recados.splice(recadosExistenteIndex, 1)
    }
  }
}
