import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    Query,
    ParseIntPipe,
    DefaultValuePipe
  } from '@nestjs/common';
  import { LibrosService } from './libros.service';
  import { CrearLibroDto } from './dto/crear-libro.dto';
  import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
  
  @ApiTags('libros')
  @Controller('libros')
  export class LibrosController {
    constructor(private readonly librosService: LibrosService) {}
  
    @Post()
    @ApiResponse({ status: 201, description: 'El libro ha sido creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Autor/es o Editorial/es no encontrado' })
    crear(@Body() crearLibroDto: CrearLibroDto) {
      return this.librosService.crear(crearLibroDto);
    }
  
    @Get()
    @ApiResponse({ status: 200, description: 'Los resultados de la busqueda fueron generados con exitos' })
    @ApiQuery({ name: 'categoria', required: false })
    @ApiQuery({ name: 'pagina', required: false })
    @ApiQuery({ name: 'limite', required: false })
    buscarTodos(
      @Query('categoria') categoria?: string,
      @Query('pagina', new DefaultValuePipe(1), ParseIntPipe) pagina = 1,
      @Query('limite', new DefaultValuePipe(10), ParseIntPipe) limite = 10,
    ) {
      return this.librosService.buscarTodos(categoria, pagina, limite);
    }
  
    @Get(':id')
    @ApiResponse({ status: 200, description: 'El Libro ha sido encontrado' })
    @ApiResponse({ status: 404, description: 'El Libro no ha sido encontrado' })
    buscarPorId(@Param('id', ParseIntPipe) id: number) {
      return this.librosService.buscarPorId(id);
    }
  
    @Put(':id')
    @ApiResponse({ status: 200, description: 'El libro ha sido modficado' })
    @ApiResponse({ status: 404, description: 'El Libro no ha sido encontrado' })
    @ApiResponse({ status: 400, description: 'Autor/es o Editorial/es no encontrado' })
    actualizar(
      @Param('id', ParseIntPipe) id: number,
      @Body() actualizarLibroDto: CrearLibroDto,
    ) {
      return this.librosService.actualizar(id, actualizarLibroDto);
    }
  
    @Delete(':id')
    @ApiResponse({ status: 200, description: 'El libro ha sido eliminado correctamente' })
    @ApiResponse({ status: 404, description: 'El libro no ha sido encontrado' })
    eliminar(@Param('id', ParseIntPipe) id: number) {
      return this.librosService.eliminar(id);
    }
  }