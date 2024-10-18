import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { catchError, tap, throwError } from "rxjs"

@Injectable()
export class ErroHanlingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {

    // await new Promise(resolve => setTimeout(resolve, 10000))
    return next.handle().pipe(
      catchError((error) => {
        return throwError(() => {
          if (error.name === 'NotFoundException') {
            return new BadRequestException(error.message)
          }
        })
      })
    )
  }
}