import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //modulo raiz
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remove chaves que nao estão no meu DTO
      forbidNonWhitelisted: true, //levanta o erro quando a chave nao existir
      transform: true, //tenta transformar os tipos de dados de pararm e dtos
    }),
    new ParseIntIdPipe()
  );
  await app.listen(3000);
}
bootstrap();
