import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import appConfig from './app.config';
import { ConfigType } from '@nestjs/config';

@Controller('home')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>
  ) { }

  @Get('hello') // Método de solicitação -> Ler (Read) -> CRUD
  // /home/hello para acessar
  getHello(): string {
    return this.appService.getHello();
  }
}
