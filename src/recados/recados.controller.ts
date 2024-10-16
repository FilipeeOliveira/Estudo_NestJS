import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ReqDataParam } from 'src/common/params/req-data-param.decorator';
import { RecadosUtils } from './recados.utils';

// CRUD
// Creat -> POST -> Criar um recado
// Read -> GET -> Ler todos os recados
// Read -> GET -> Ler apenas um recado
// Update -> PATCH / PUT -> Atualizar um recado
// Delete -> Delete -> Apagar um recado

//PATCH é utilizado para atualizar dados de um recurso
//PUT é utilizado para atualizar um recurso inteiro

//DTO - Data Transfer Object -> Objeto de transferência
//DTO - Objeto simples -> Validar dados / Transformar dados

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService,
    private readonly recadosUtils: RecadosUtils) { }


  @Get()
  async findAll(@Query() paginationDto: PaginationDto, @ReqDataParam('url') url) {
    console.log(url)

    const recados = await this.recadosService.findAll(paginationDto);
    return recados
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(this.recadosUtils.inverteString('iatecam'))

    return this.recadosService.findOne(id);

  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateRecadoDto: UpdateRecadoDto,
  ) {
    this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  romove(@Param('id') id: number) {
    this.recadosService.remove(id);
  }
}
