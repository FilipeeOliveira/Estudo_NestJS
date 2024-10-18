import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const startTime = Date.now()
    console.log('TimingConnectionInterceptor Excutado my friend ANTES')

    await new Promise(resolve => setTimeout(resolve, 10000))
    return next.handle().pipe(
      tap(() => {
        const finalTime = Date.now()
        const afterTime = finalTime - startTime
        console.log(`TimingConnectionIntercptor executado DEPOIS de ${afterTime}ms`)
      })
    )
  }
}