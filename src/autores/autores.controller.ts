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
  import { AutoresService } from './autores.service';
  import { CrearAutorDto } from './dto/crear-autor.dto';
  import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
  
  @ApiTags('autores')
  @Controller('autores')
  export class AutoresController {
    constructor(private readonly autoresService: AutoresService) {}
  
    @Post()
    @ApiResponse({ status: 201, description: 'El autor ha sido creado exitosamente.' })
    @ApiResponse({ status: 400, description: 'Los datos son inválidos.' })
    crear(@Body() crearAutorDto: CrearAutorDto) {
      return this.autoresService.crear(crearAutorDto);
    }
  
    @Get()
    @ApiResponse({ status: 200, description: 'Los resultados de la busqueda fueron generados con exitos' })
    @ApiQuery({ name: 'pagina', required: false })
    @ApiQuery({ name: 'limite', required: false })
    buscarTodos(
      @Query('pagina', new DefaultValuePipe(1), ParseIntPipe) pagina = 1,
      @Query('limite', new DefaultValuePipe(10), ParseIntPipe) limite = 10,
    ) {
      return this.autoresService.buscarTodos(pagina, limite);
    }
  
    @Get(':id')
    @ApiResponse({ status: 200, description: 'El Autor ha sido encontrado' })
    @ApiResponse({ status: 404, description: 'El Autor no ha sido encontrado' })
    buscarPorId(@Param('id', ParseIntPipe) id: number) {
      return this.autoresService.buscarPorId(id);
    }
  
    @Put(':id')
    @ApiResponse({ status: 200, description: 'El Autor ha sido modficado' })
    @ApiResponse({ status: 404, description: 'El Autor no ha sido encontrado' })
    actualizar(
      @Param('id', ParseIntPipe) id: number,
      @Body() actualizarAutorDto: CrearAutorDto,
    ) {
      return this.autoresService.actualizar(id, actualizarAutorDto);
    }
  
    @Delete(':id')
    @ApiResponse({ status: 404, description: 'El Autor no ha sido encontrado' })
    eliminar(@Param('id', ParseIntPipe) id: number) {
      return this.autoresService.eliminar(id);
    }
  }
  