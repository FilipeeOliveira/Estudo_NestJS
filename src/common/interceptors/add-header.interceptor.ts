import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    console.log('AddInterceptor Excutado my friend')

    const response = context.switchToHttp().getResponse()

    response.setHeader('X-custom-Header', 'O valor do cabeçalho')
    return next.handle()
  }
}