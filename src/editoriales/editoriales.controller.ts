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
  import { EditorialesService } from './editoriales.service';
  import { CrearEditorialDto } from './dto/crear-editorial.dto';
  import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
  
  @ApiTags('editoriales')
  @Controller('editoriales')
  export class EditorialesController {
    constructor(private readonly editorialesService: EditorialesService) {}
  
    @Post()
    @ApiResponse({ status: 201, description: 'La editorial ha sido creada con éxito.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    crear(@Body() crearEditorialDto: CrearEditorialDto) {
      return this.editorialesService.crear(crearEditorialDto);
    }
  
    @Get()
    @ApiResponse({ status: 200, description: 'Los resultados de la busqueda fueron generados con exitos' })
    @ApiQuery({ name: 'pagina', required: false })
    @ApiQuery({ name: 'limite', required: false })
    buscarTodos(
      @Query('pagina', new DefaultValuePipe(1), ParseIntPipe) pagina = 1,
      @Query('limite', new DefaultValuePipe(10), ParseIntPipe) limite = 10,
    ) {
      return this.editorialesService.buscarTodos(pagina, limite);
    }
  
    @Get(':id')
    @ApiResponse({ status: 200, description: 'La Editorial buscada fue encontrada' })
    @ApiResponse({ status: 404, description: 'Editorial no encontrada' })
    buscarPorId(@Param('id', ParseIntPipe) id: number) {
      return this.editorialesService.buscarPorId(id);
    }
  
    @Put(':id')
    @ApiResponse({ status: 200, description: 'La editorial ha sido modificada' })
    actualizar(
      @Param('id', ParseIntPipe) id: number,
      @Body() actualizarEditorialDto: CrearEditorialDto,
    ) {
      return this.editorialesService.actualizar(id, actualizarEditorialDto);
    }
  
    @Delete(':id')
    @ApiResponse({ status: 200, description: 'La editorial ha sido eliminada exitosamente' })
    @ApiResponse({ status: 404, description: 'La editorial que se quiere eliminar no pudo ser encontrada' })
    eliminar(@Param('id', ParseIntPipe) id: number) {
      return this.editorialesService.eliminar(id);
    }
  }