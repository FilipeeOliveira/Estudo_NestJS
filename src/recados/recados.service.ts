import { ForbiddenException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { RecadoEntity } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import recadosConfig from './recados.config';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { ReponseRecadoDto } from './dto/response-recado.dto';

//Scope.DEFAULT -> O provider em questao é um singleton
//Scope.REQUEST -> O provider em questao é instaciado a cada requisicao
//Scope.TRANSIENT -> É criada uma instacia do provider para cada classe que injetar esse provider

@Injectable({ scope: Scope.DEFAULT })
export class RecadosService {
  private count = 0

  constructor(
    @InjectRepository(RecadoEntity)
    private readonly recadoRepository: Repository<RecadoEntity>,
    private readonly pessoasService: PessoasService,
    @Inject(recadosConfig.KEY)
    private readonly recadosConfiguration: ConfigType<typeof recadosConfig>
  ) {
    console.log(recadosConfiguration)
  }


  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado');
  }

  async findAll(paginationDto?: PaginationDto): Promise<ReponseRecadoDto[]> {
    const { limit = 10, offset = 0 } = paginationDto

    const recados = await this.recadoRepository.find({
      take: limit,  //quantos registros serao exibidos (por pagina)
      skip: offset, // quantos registros devem ser pulados 
      relations: ['de', 'para'],
      order: {
        id: 'desc'
      },
      select: {
        de: {
          id: true,
          nome: true
        },
        para: {
          id: true,
          nome: true
        }
      }
    });
    return recados;
  }

  async findOne(id: number): Promise<ReponseRecadoDto> {
    // o find() Procura o primeiro item de um array que atende a uma condição e te dá esse item.
    //return this.recados.find(item => item.id === id) //para comverter o id string em number uso o +(mais) antes
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      },
      relations: ['de', 'para'],
      order: {
        id: 'desc'
      },
      select: {
        de: {
          id: true,
          nome: true
        },
        para: {
          id: true,
          nome: true
        }
      }
    });

    if (recado) return recado;

    this.throwNotFoundError();
  }

  async create(createRecadoDto: CreateRecadoDto, tokenPayload: TokenPayloadDto): Promise<ReponseRecadoDto> {
    const { paraId } = createRecadoDto

    //Encontrar a pessoa que está criando o recado
    const de = await this.pessoasService.findOne(tokenPayload.sub)
    //Encontrar a pessoa para quem o recado está sendo enviado
    const para = await this.pessoasService.findOne(paraId)

    const novoRecado = {
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };

    const recado = await this.recadoRepository.create(novoRecado);
    await this.recadoRepository.save(recado);

    return {
      ...recado,
      de: {
        id: recado.de.id,
        nome: recado.de.nome
      },
      para: {
        id: recado.para.id,
        nome: recado.para.nome
      }
    }
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto, tokenPayload: TokenPayloadDto): Promise<ReponseRecadoDto> {
    const recado = await this.findOne(id)

    if (recado.de.id !== tokenPayload.sub) {
      throw new ForbiddenException('Esse recado nao é seu!')
    }

    recado.texto = updateRecadoDto?.texto ?? recado.texto
    recado.lido = updateRecadoDto?.lido ?? recado.lido
    await this.recadoRepository.save(recado)
    return recado
  }



  async remove(id: number, tokenPayload: TokenPayloadDto): Promise<ReponseRecadoDto> {
    const recado = await this.findOne(id)

    if (recado.de.id !== tokenPayload.sub) {
      throw new ForbiddenException('Esse recado nao é seu!')
    }

    await this.recadoRepository.delete(recado.id)

    return recado;
  }
}
