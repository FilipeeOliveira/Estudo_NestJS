import { IsEmail, IsNotEmpty, IsString, Max, MaxLength, MinLength } from "class-validator"

export class CreatePessoaDto {
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  nome: string

}
