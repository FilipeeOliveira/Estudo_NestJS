import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('home')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello') // Método de solicitação -> Ler (Read) -> CRUD
  // /home/hello para acessar
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('exemplo')
  exemplo() {
    return 'Exemplo de rota';
  }
}
