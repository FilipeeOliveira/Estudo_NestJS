import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { RecadoEntity } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(RecadoEntity)
    private readonly recadoRepository: Repository<RecadoEntity>
  ) { }

  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado');
  }

  async findAll() {
    const recados = await this.recadoRepository.find()
    return recados
  }

  async findOne(id: number) {
    // o find() Procura o primeiro item de um array que atende a uma condição e te dá esse item.
    //return this.recados.find(item => item.id === id) //para comverter o id string em number uso o +(mais) antes
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      },
    })

    if (recado) return recado

    this.throwNotFoundError()

  }


  async create(createRecadoDto: CreateRecadoDto) {
    const novoRecado = {
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    }

    const recado = await this.recadoRepository.create(novoRecado)

    return this.recadoRepository.save(recado)
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partialUpdateRecadoDto = {
      lido: updateRecadoDto?.lido,
      texto: updateRecadoDto?.texto,
    }
    const recado = await this.recadoRepository.preload({
      id,
      ...partialUpdateRecadoDto
    })

    if (!recado) return this.throwNotFoundError()
    return this.recadoRepository.save(recado)

  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({
      id,
    })

    if (!recado) return this.throwNotFoundError()

    return this.recadoRepository.remove(recado)
  }
}
