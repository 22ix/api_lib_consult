## Proceso de Creación 

Para realizar este ejercicio se realizaron los siguientes pasos:
<ol>
<li>Crear el proyecto NestJS usando el CLI</li>
<li>Instalar las dependencias necesarias:
   <ol type="1">
   <li>@nestjs/common</li>
   <li>@nestjs/core</li>
   <li>@nestjs/platform-express</li>
   <li>@nestjs/swagger</li>
   <li>mysql2</li>
   <li>class-validator</li>
   <li>class-transformer</li>
   <li>swagger-ui-express</li>
   </ol>
</li>
<li>Configurar MySQL:
   <ol type="1">
   <li>Crear base de datos 'biblioteca'</li>
   <li>Configurar credenciales en database.config.ts</li>
   </ol>
</li>
<li>Diseñar estructura del proyecto:
   <ol type="1">
   <li>Módulos (libros, autores, editoriales)</li>
   <li>DTOs</li>
   <li>Servicios</li>
   <li>Controladores</li>
   </ol>
</li>
<li>Diseñar estructura de la base de datos:
   <ol type="1">
   <li>Tabla autores (id, nombre, apellido, dni, nacionalidad)</li>
   <li>Tabla editoriales (id, nombre, direccion, cuit)</li>
   <li>Tabla libros (id, titulo, categoria, precio, fecha_lanzamiento, descripcion, editorial_id)</li>
   <li>Tabla libro_autores (libro_id, autor_id)</li>
   </ol>
</li>
<li>Definir entidades y DTOs:
   <ol type="1">
   <li>CrearLibroDto</li>
   <li>CrearAutorDto</li>
   <li>CrearEditorialDto</li>
   <li>Validaciones con class-validator</li>
   </ol>
</li>
<li>Implementar Controllers y Services:
   <ol type="1">
   <li>CRUD completo para cada entidad</li>
   <li>Manejo de transacciones</li>
   <li>Validaciones de negocio</li>
   <li>Paginación y filtrado</li>
   </ol>
</li>
<li>Configurar Swagger:
   <ol type="1">
   <li>Documentar endpoints</li>
   <li>Agregar decoradores ApiTags</li>
   <li>Configurar descripciones y tipos</li>
   </ol>
</li>
<li>Probar CRUD básico:
   <ol type="1">
   <li>Crear registros</li>
   <li>Leer registros</li>
   <li>Actualizar registros</li>
   <li>Eliminar registros</li>
   </ol>
</li>
<li>Implementar características adicionales:
   <ol type="1">
   <li>Filtrado por categoría</li>
   <li>Paginación</li>
   <li>Corrección de Páginación (hubo un problema en el que no estaba arrojando correctamente los libros)</li>
   <li>Validaciones cruzadas entre entidades (enfasís en libro, que utiliza referencias de 2 entidades diferentes)</li>
   </ol>
</li>
<li>Realizar pruebas completas:
   <ol type="1">
   <li>Verificar todas las validaciones</li>
   <li>Probar casos de error</li>
   <li>Probar todas las modificaciones posibles a traves de la interfaz de swagger</li>
   <li>Probar modificaciones solo con el backend</li>
   </ol>
</li>
</ol>
##Bibliografia
César Arango Web. (2022, 24 de abril). #1-7 Curso de Nodejs: Rest Api con express y Mysql, | CRUD | Autenticación | Aplicación Completa [Videos del 1 al 7]. YouTube. [https://www.youtube.com/watch?v=F5oOq-FWUl4](https://www.youtube.com/watch?v=F5oOq-FWUl4)

Bluuweb. (24 de Julio del 2023). <i>Curso completo de NEST JS: API REST con MySQL, TypeORM, TypeScript.</i> [https://www.youtube.com/watch?v=RWUmlsdZ1e4](https://www.youtube.com/watch?v=RWUmlsdZ1e4).
