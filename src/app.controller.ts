import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigType } from '@nestjs/config';
import globalConfig from './global-config/global.config';

@Controller('home')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(globalConfig.KEY)
    private readonly globaConfiguration: ConfigType<typeof globalConfig>
  ) {
    console.log(globaConfiguration)
  }

  @Get('hello') // Método de solicitação -> Ler (Read) -> CRUD
  // /home/hello para acessar
  getHello(): string {
    return this.appService.getHello();
  }
}
