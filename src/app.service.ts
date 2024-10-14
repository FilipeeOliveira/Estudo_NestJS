import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  solucinaExemplo(){
    return 'Exemplo usa o service'
  }
}
