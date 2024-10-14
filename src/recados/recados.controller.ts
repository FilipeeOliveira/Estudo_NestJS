import { Controller, Get, Param } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
    //encontrar todos os recados
    @Get()
    findAll() {
        return 'Essa rota retorna todos os recados'
    }
    //econtra um recado
    @Get(':id')
    findOne(@Param('id') id: string){
        return `Essa rota retorna o recado ${id}`
    }
}
