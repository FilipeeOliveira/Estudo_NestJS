import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('recados') // Tag usada para organizar os endpoints
@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) { }

  @Get()
  @ApiOperation({ summary: 'Obter todos os recados com paginação' }) // Descrição do endpoint
  @ApiQuery({
    name: 'offset',
    required: false,
    example: 1,
    description: 'Itens a pular',
  }) // Parâmetros da query
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Limite de itens por página',
  })
  @ApiResponse({ status: 200, description: 'Recados retornados com sucesso.' }) // Resposta bem-sucedida
  async findAll(@Query() paginationDto: PaginationDto) {
    const recados = await this.recadosService.findAll(paginationDto);
    return recados;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um recado específico pelo ID' }) // Descrição da operação
  @ApiParam({ name: 'id', description: 'ID do recado', example: 1 }) // Parâmetro da rota
  @ApiResponse({ status: 200, description: 'Recado retornado com sucesso.' }) // Resposta bem-sucedida
  @ApiResponse({ status: 404, description: 'Recado não encontrado.' }) // Resposta de erro
  findOne(@Param('id') id: string) {
    return this.recadosService.findOne(+id);
  }

  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth() // Autenticação via token
  @Post()
  @ApiOperation({ summary: 'Criar um novo recado' }) // Descrição do endpoint
  @ApiResponse({ status: 201, description: 'Recado criado com sucesso.' }) // Resposta de criação bem-sucedida
  @ApiResponse({ status: 400, description: 'Dados inválidos.' }) // Resposta de erro
  create(
    @Body() createRecadoDto: CreateRecadoDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.recadosService.create(createRecadoDto, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um recado existente' }) // Descrição da operação
  @ApiParam({ name: 'id', description: 'ID do recado', example: 1 }) // Parâmetro da rota
  @ApiResponse({ status: 200, description: 'Recado atualizado com sucesso.' }) // Resposta de sucesso
  @ApiResponse({ status: 404, description: 'Recado não encontrado.' }) // Resposta de erro
  update(
    @Param('id') id: number,
    @Body() updateRecadoDto: UpdateRecadoDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.recadosService.update(id, updateRecadoDto, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um recado' }) // Descrição do endpoint
  @ApiParam({ name: 'id', description: 'ID do recado', example: 1 }) // Parâmetro da rota
  @ApiResponse({ status: 200, description: 'Recado excluído com sucesso.' }) // Resposta de sucesso
  @ApiResponse({ status: 404, description: 'Recado não encontrado.' }) // Resposta de erro
  remove(
    @Param('id') id: number,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.recadosService.remove(id, tokenPayload);
  }
}