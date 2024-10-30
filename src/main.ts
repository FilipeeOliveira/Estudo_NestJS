import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //modulo raiz
import helmet from 'helmet'
import appConfig from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appConfig(app);

  if (process.env.NODE_ENV === 'developtment') {
    // helmet -> cabeçalhos de segurança no protocolo HTTP
    app.use(helmet());

    // cors -> permitir que outro domínio faça requests na sua aplicação
    app.enableCors({
      origin: 'https://meuapp.com.br',
    });
  }

  await app.listen(process.env.APP_PORT);
}
bootstrap();