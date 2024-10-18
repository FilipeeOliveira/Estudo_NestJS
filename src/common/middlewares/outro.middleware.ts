import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class OutroMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers?.authorization

    if (authorization) {
      req['user'] = {
        nome: 'Filipe',
        sobrenome: 'Oliveira'
      }
    }

    res.setHeader('CABECALHO', 'Do Middleware')

    //Terminando a cadeia de chamadas
    // return res.status(404).send({
    //   message: 'Nao encontrado',
    // })

    next()

  }
}