## Proceso de Creación 


<ol>
<li>Crear el proyecto NestJS usando el CLI</li>
<li>Instalar las dependencias necesarias:
   - @nestjs/common
   - @nestjs/core
   - @nestjs/platform-express
   - @nestjs/swagger
   - mysql2
   - class-validator
   - class-transformer
   - swagger-ui-express</li>
<li>Configurar MySQL:
   - Crear base de datos 'biblioteca'
   - Configurar credenciales en database.config.ts
<li>Diseñar estructura del proyecto:
   - Módulos (libros, autores, editoriales)
   - DTOs
   - Servicios
   - Controladores</li>
<li>Diseñar estructura de la base de datos y diagrama de la misma:
   - Tabla autores (id, nombre, apellido, dni, nacionalidad)
   - Tabla editoriales (id, nombre, direccion, cuit)
   - Tabla libros (id, titulo, categoria, precio, fecha_lanzamiento, descripcion, editorial_id)
   - Tabla libro_autores (libro_id, autor_id)</li>
<li>Definir entidades y DTOs:
   - CrearLibroDto
   - CrearAutorDto
   - CrearEditorialDto
   - Validaciones con class-validator</li>
<li>Implementar Controllers y Services:
   - CRUD completo para cada entidad
   - Manejo de transacciones
   - Validaciones de negocio
   - Paginación y filtrado</li>
<li>Trabajar Swagger:
   - Documentar endpoints
   - Agregar decoradores ApiTags
   - Configurar descripciones y tipos</li>
<li>Probar CRUD básico:
   - Crear registros
   - Leer registros (individuales y listados)
   - Actualizar registros
   - Eliminar registros</li>
<li>Implementar características adicionales:
   - Filtrado por categoría
   - Paginación
   - Manejo flexible de fechas
   - Validaciones cruzadas entre entidades</li>
<li>Realizar pruebas completas:
   - Verificar todas las validaciones
   - Probar casos de error
   - Verificar integridad de datos</li>
<li>Subir a GitHub:
   - Inicializar repositorio
   - Crear .gitignore
   - Documentar instalación y uso</li>
</ol>
