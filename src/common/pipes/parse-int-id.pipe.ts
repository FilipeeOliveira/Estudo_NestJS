import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    //console.log('Piper executado my friend')
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value
    }

    const parsedValue = Number(value)

    if (isNaN(parsedValue)) {
      throw new BadRequestException('ParseIntIdPipe espera uma string numerica')
    }

    if (parsedValue < 0) {
      throw new BadRequestException('ParseIntIdPipe espera um numero maior do que 0')
    }

    return value
  }
}