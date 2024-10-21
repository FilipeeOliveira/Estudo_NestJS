import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadoEntity } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils, RecadosUtilsMock } from './recados.utils';
import { ONLY_LOWERCASE_LETTERS_REGEX, REMOVE_SPACES_REGEX, Serve_Name } from 'src/recados/recados.constants';
import { RegexProtocol } from 'src/common/regex/regex-protocol';
import { RemoveSpacesRegex } from 'src/common/regex/remove-spaces.regex';
import { OnlyLowercaseLettersRegex } from 'src/common/regex/only-lowercase-letters.regex';

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
    },
    {
      provide: ONLY_LOWERCASE_LETTERS_REGEX,
      useClass: OnlyLowercaseLettersRegex
    },
    {
      provide: REMOVE_SPACES_REGEX,
      useClass: RemoveSpacesRegex
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
