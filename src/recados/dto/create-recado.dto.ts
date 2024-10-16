import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRecadoDto {
  @IsString() //tem que ter uma string
  @IsNotEmpty() //nao pode ser vazio
  @MinLength(5)
  @MaxLength(255)
  @IsOptional()
  readonly texto: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly de: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly para: string;
}
