import { IsString, Matches, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearAutorDto {
  @ApiProperty({ example: 'Julie', description: 'Nombre del autor/a' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Pottinger', description: 'Apellido del autor/a' })
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({ example: '23875421', description: 'DNI del autor (8 dígitos)' })
  @IsNotEmpty()
  @Matches(/^\d{8}$/, { message: 'el DNI debe tener 8 dígitos' })
  dni: string;

  @ApiProperty({ example: 'Estadounidense', description: 'Nacionalidad del autor/a' })
  @IsString()
  @IsNotEmpty()
  nacionalidad: string;
}