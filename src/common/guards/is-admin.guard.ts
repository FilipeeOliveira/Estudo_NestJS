import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class isAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const role = request['user']?.role
    return role === 'admin' // pode ser assim em vez do if

    //   if (role === 'admin') {
    //     return true //Pode acessar a rota
    //   }


    //   return false //Nao pode acessar a rota
  }
}