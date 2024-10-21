import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadoEntity } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils, RecadosUtilsMock } from './recados.utils';
import { Serve_Name } from 'src/common/constants/serve-name.constants';

@Module({
  imports: [TypeOrmModule.forFeature([RecadoEntity]),
  forwardRef(() => PessoasModule)],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    {
      provide: RecadosUtils, //token
      //useClass: RecadosUtils,
      useValue: new RecadosUtilsMock(), //Valor a ser usado (para testes e tals)
    },
    {
      provide: Serve_Name,
      useValue: 'My name is NestJs'
    }
  ],
  exports: [
    {
      provide: RecadosUtils,
      useClass: RecadosUtils,
    },
    Serve_Name
  ],
})
export class RecadosModule { }
