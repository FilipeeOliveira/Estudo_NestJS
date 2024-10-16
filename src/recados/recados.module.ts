import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadoEntity } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils } from './recados.utils';

@Module({
  imports: [TypeOrmModule.forFeature([RecadoEntity]), PessoasModule],
  controllers: [RecadosController],
  providers: [RecadosService, RecadosUtils],
})
export class RecadosModule { }
