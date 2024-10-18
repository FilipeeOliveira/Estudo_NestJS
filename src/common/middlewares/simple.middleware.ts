import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SimpleMiddleware: Ola')
    const authorization = req.headers?.authorization

    if (authorization) {
      req['user'] = {
        nome: 'Filipe',
        sobrenome: 'Oliveira',
        role: 'admin'
      }
    }

    res.setHeader('CABECALHO', 'Do Middleware')

    //Terminando a cadeia de chamadas
    // return res.status(404).send({
    //   message: 'Nao encontrado',
    // })

    next()

    console.log('SimpleMiddleware: Tchau')

    res.on('finish', () => {
      console.log('SimpleMiddleware: Terminou')
    })
  }
}