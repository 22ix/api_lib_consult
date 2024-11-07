// src/libros/libros.service.ts
import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, HttpException } from '@nestjs/common';
import { pool } from '../config/database.config';
import { CrearLibroDto } from './dto/crear-libro.dto';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

@Injectable()
export class LibrosService {
  async crear(crearLibroDto: CrearLibroDto) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // Verificar que existe la editorial
      const [editoriales] = await conn.query<RowDataPacket[]>(
        'SELECT id FROM editoriales WHERE id = ?',
        [crearLibroDto.editorial_id]
      );
      if (!editoriales[0]) {
        throw new BadRequestException('Editorial no encontrada');
      }

      // Verificar que existen todos los autores
      const [autores] = await conn.query<RowDataPacket[]>(
        'SELECT id FROM autores WHERE id IN (?)',
        [crearLibroDto.autor_ids]
      );
      if (autores.length !== crearLibroDto.autor_ids.length) {
        throw new BadRequestException('Uno o más autores no encontrados');
      }

      // Insertar el libro
      const [result] = await conn.query<ResultSetHeader>(
        `INSERT INTO libros (titulo, categoria, precio, fecha_lanzamiento, descripcion, editorial_id)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          crearLibroDto.titulo,
          crearLibroDto.categoria,
          crearLibroDto.precio,
          crearLibroDto.fecha_lanzamiento,
          crearLibroDto.descripcion,
          crearLibroDto.editorial_id
        ]
      );

      // Insertar relaciones libro-autor
      const libroId = result.insertId;
      for (const autorId of crearLibroDto.autor_ids) {
        await conn.query<ResultSetHeader>(
          'INSERT INTO libro_autores (libro_id, autor_id) VALUES (?, ?)',
          [libroId, autorId]
        );
      }

      await conn.commit();
      return this.buscarPorId(libroId);
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  async buscarTodos(categoria?: string, pagina = 1, limite = 10) {
    const offset = (pagina - 1) * limite;
    let query = `
      SELECT 
        l.*,
        GROUP_CONCAT(DISTINCT a.id) as autor_ids,
        GROUP_CONCAT(DISTINCT CONCAT(a.nombre, ' ', a.apellido)) as nombres_autores,
        e.nombre as editorial_nombre,
        e.direccion as editorial_direccion,
        e.cuit as editorial_cuit
      FROM libros l
      LEFT JOIN libro_autores la ON l.id = la.libro_id
      LEFT JOIN autores a ON la.autor_id = a.id
      LEFT JOIN editoriales e ON l.editorial_id = e.id
    `;

    const params = [];
    if (categoria) {
      query += ' WHERE l.categoria = ?';
      params.push(categoria);
    }

    query += ' GROUP BY l.id LIMIT ? OFFSET ?';
    params.push(limite, offset);

    const [libros] = await pool.query<RowDataPacket[]>(query, params);
    const [totalRows] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(DISTINCT l.id) as total FROM libros l' + (categoria ? ' WHERE l.categoria = ?' : ''),
      categoria ? [categoria] : []
    );
    const total = totalRows[0].total;

    return {
      datos: libros,
      total,
      pagina,
      limite
    };
  }

  async buscarPorId(id: number) {
    const [libros] = await pool.query<RowDataPacket[]>(
      `SELECT 
        l.*,
        GROUP_CONCAT(DISTINCT a.id) as autor_ids,
        GROUP_CONCAT(DISTINCT CONCAT(a.nombre, ' ', a.apellido)) as nombres_autores,
        e.nombre as editorial_nombre,
        e.direccion as editorial_direccion,
        e.cuit as editorial_cuit
      FROM libros l
      LEFT JOIN libro_autores la ON l.id = la.libro_id
      LEFT JOIN autores a ON la.autor_id = a.id
      LEFT JOIN editoriales e ON l.editorial_id = e.id
      WHERE l.id = ?
      GROUP BY l.id`,
      [id]
    );

    if (!libros[0]) {
      throw new NotFoundException(`Libro con ID ${id} no encontrado`);
    }

    return libros[0];
  }

  async actualizar(id: number, actualizarLibroDto: CrearLibroDto) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // Verificar que existe el libro
      const libroExiste = await this.buscarPorId(id);
      if (!libroExiste) {
        throw new NotFoundException(`Libro con ID ${id} no encontrado`);
      }

      // Verificar que existe la editorial
      const [editoriales] = await conn.query<RowDataPacket[]>(
        'SELECT id FROM editoriales WHERE id = ?',
        [actualizarLibroDto.editorial_id]
      );
      if (!editoriales[0]) {
        throw new BadRequestException(`Editorial con ID ${actualizarLibroDto.editorial_id} no encontrada`);
      }

      // Verificar que existen todos los autores
      const [autores] = await conn.query<RowDataPacket[]>(
        'SELECT id FROM autores WHERE id IN (?)',
        [actualizarLibroDto.autor_ids]
      );
      if (autores.length !== actualizarLibroDto.autor_ids.length) {
        throw new BadRequestException('Uno o más autores no encontrados');
      }

      // Actualizar el libro
      await conn.query<ResultSetHeader>(
        `UPDATE libros 
         SET titulo = ?, categoria = ?, precio = ?, fecha_lanzamiento = ?, 
             descripcion = ?, editorial_id = ?
         WHERE id = ?`,
        [
          actualizarLibroDto.titulo,
          actualizarLibroDto.categoria,
          actualizarLibroDto.precio,
          actualizarLibroDto.fecha_lanzamiento,
          actualizarLibroDto.descripcion,
          actualizarLibroDto.editorial_id,
          id
        ]
      );

      // Actualizar autores
      await conn.query<ResultSetHeader>('DELETE FROM libro_autores WHERE libro_id = ?', [id]);
      for (const autorId of actualizarLibroDto.autor_ids) {
        await conn.query<ResultSetHeader>(
          'INSERT INTO libro_autores (libro_id, autor_id) VALUES (?, ?)',
          [id, autorId]
        );
      }

      await conn.commit();
      return this.buscarPorId(id);
    } catch (error) {
      await conn.rollback();
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el libro');
    } finally {
      conn.release();
    }
  }

  async eliminar(id: number) {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM libros WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      throw new NotFoundException(`Libro con ID ${id} no encontrado`);
    }
    return { mensaje: 'Libro eliminado exitosamente' };
  }
}