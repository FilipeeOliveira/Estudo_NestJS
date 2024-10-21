import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadoEntity } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils } from './recados.utils';
import { RegexFactory } from 'src/common/regex/regex.factory';
import { ONLY_LOWERCASE_LETTERS_REGEX, REMOVE_SPACES_REGEX } from './recados.constants';
import { RemoveSpacesRegex } from 'src/common/regex/remove-spaces.regex';
import { resolve } from 'path';

@Module({
  imports: [TypeOrmModule.forFeature([RecadoEntity]),
  forwardRef(() => PessoasModule)
  ],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    RecadosUtils,
    RegexFactory,
    {
      provide: REMOVE_SPACES_REGEX, //token
      useFactory: (regexFactory: RegexFactory) => {
        return regexFactory.create('RemoveSpacesRegex')
      }, //Factory
      inject: [RegexFactory] //Injetando na factory na ordem
    },
    {
      provide: ONLY_LOWERCASE_LETTERS_REGEX, //token
      useFactory: async (regexFactory: RegexFactory) => {
        //espera alguma coisa acontecer
        console.log('VOu aguardar a promise ser resolvida')
        await new Promise(resolve => setTimeout(resolve, 3000))

        return regexFactory.create('OnlyLowercaseLettersRegex')
      }, //Factory
      inject: [RegexFactory] //Injetando na factory na ordem
    }
  ],
  exports: [RecadosUtils],
})
export class RecadosModule { }
