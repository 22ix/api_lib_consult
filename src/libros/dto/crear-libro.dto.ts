import { IsString, IsNumber, IsArray, IsDateString, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty,  } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CrearLibroDto {
  @ApiProperty({    example: 'El Duque y Yo', description: 'Título del libro' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ example: 'Romance Historico', description: 'Categoría literaria del texto'
})
  @IsString()
  @IsNotEmpty()
  categoria: string;

  @ApiProperty({ example: 7.99, description: 'Precio del libro' 
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  precio: number;

  @ApiProperty({ example: '01/05/2000', description: 'Fecha de publicación (DD/MM/YYYY || DD/MM/YY)' 
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      const partes = value.split('/');
      if (partes.length === 3) {
        let anio = partes[2];
        if (anio.length === 2) {
          anio = '20' + anio;
        }
        return `${anio}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
      }
    }
    return value;
  })
  @IsDateString()
  @IsNotEmpty()
  fecha_lanzamiento: string;

  @ApiProperty({    example: 'Este primer libro de la saga trata del mercado matrimonial británico en el siglo XIX', description: 'Descripción del libro' })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({    example: ['0', '3'], description: 'Array de IDs de autores (usa la PK por defecto)'})
  @IsArray()
  @IsNotEmpty()
  autor_ids: number[];

  @ApiProperty({ example: '0', description: 'ID de la editorial (usa la PK por defecto)' 
  })
  @IsNumber()
  @IsNotEmpty()
  editorial_id: number;
}
