import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Injectable()
export class PessoasService {
  private count = 0

  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>, //basicamento isso é o banco de dados
    private readonly hashingService: HashingService
  ) {
    this.count++
  }

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const passwordHash = await this.hashingService.hash(
        createPessoaDto.password,
      )

      const dadosPessoa = {
        nome: createPessoaDto.nome,
        passwordHash,
        email: createPessoaDto.email
      }

      const novaPessoa = this.pessoaRepository.create(dadosPessoa)
      await this.pessoaRepository.save(novaPessoa)
      return novaPessoa
    } catch (error) {
      if (error.code === '23505') { //aqui basicamente to capturando o erro com o codigo dele, e informando que o email ja foi cadastro com um if
        throw new ConflictException('E-mail já está cadastrado')
      }

      throw error
    }

  }

  async findAll() {
    const pessoas = await this.pessoaRepository.find({
      order: {
        id: 'desc'
      },
    })

    return pessoas;
  }

  async findOne(id: number) {
    this.count++
    const pessoa = await this.pessoaRepository.findOneBy({
      id,
    });

    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }

    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto, tokenPayload: TokenPayloadDto) {
    const dadosPessoa = {
      nome: updatePessoaDto?.nome,  /// basicamaente esse diacho e a atualizacao do user, sendo opcional e dai ele armazena numa variavel   
    }
    if (updatePessoaDto?.password) {
      const passwordHash = await this.hashingService.hash(
        updatePessoaDto.password
      )

      dadosPessoa['passwordHash'] = passwordHash
    }

    const pessoa = await this.pessoaRepository.preload({
      id,
      ...dadosPessoa
    })

    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada')
    }


    if (pessoa.id !== tokenPayload.sub) {
      throw new ForbiddenException('Você nao é essa pessoa')
    }

    return this.pessoaRepository.save(pessoa)
  }

  async remove(id: number, tokenPayload: TokenPayloadDto) {
    const pessoa = await this.findOne(id)

    if (pessoa.id !== tokenPayload.sub) {
      throw new ForbiddenException('Você nao é essa pessoa')
    }

    return this.pessoaRepository.remove(pessoa)

  }
}
