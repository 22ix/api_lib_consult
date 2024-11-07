import { IsString, Matches, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearEditorialDto {
  @ApiProperty({ example: 'Santillana', description: 'Nombre de la editorial' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'El país de las maravillas 1329', description: 'Dirección de la Editorial' })
  @IsString()
  @IsNotEmpty()
  direccion: string;

  @ApiProperty({example: '20472859667', description: 'CUIT de la editorial'})
  @IsNotEmpty()
  @Matches(/^\d{2}-\d{8}-\d{1}$/, { message: 'CUIT debe tener el formato XX-XXXXXXXX-X' })
  cuit: string;
}