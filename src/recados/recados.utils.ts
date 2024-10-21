import { Injectable } from "@nestjs/common";

@Injectable()
export class RecadosUtils {
  inverteString(str: string) {

    console.log("nao é mock")
    return str.split('').reverse().join('')
  }
}

@Injectable()
export class RecadosUtilsMock {
  inverteString() {
    console.log('Passei no mock')
    return 'bal bla bla'
  }
}