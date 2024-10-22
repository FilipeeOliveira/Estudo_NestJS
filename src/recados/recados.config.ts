import { registerAs } from "@nestjs/config";

export default registerAs('recados', () => ({
  teste1: 'VALOR_1',
  teste2: 'VALOR_2'
}))