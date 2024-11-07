import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { pool } from '../config/database.config';
import { CrearAutorDto } from './dto/crear-autor.dto';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

@Injectable()
export class AutoresService {
  async crear(crearAutorDto: CrearAutorDto) {
    try {
      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO autores (nombre, apellido, dni, nacionalidad)
         VALUES (?, ?, ?, ?)`,
        [
          crearAutorDto.nombre,
          crearAutorDto.apellido,
          crearAutorDto.dni,
          crearAutorDto.nacionalidad
        ]
      );

      return this.buscarPorId(result.insertId);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('El DNI ya existe en la base de datos');
      }
      throw error;
    }
  }

  async buscarTodos(pagina = 1, limite = 10) {
    const offset = (pagina - 1) * limite;
    
    const [autores] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM autores LIMIT ? OFFSET ?`,
      [limite, offset]
    );

    const [totalRows] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as total FROM autores'
    );
    const total = totalRows[0].total;

    return {
      datos: autores,
      total,
      pagina,
      limite
    };
  }

  async buscarPorId(id: number) {
    const [autores] = await pool.query<RowDataPacket[]>(
      `SELECT 
        a.*,
        GROUP_CONCAT(DISTINCT l.id) as libro_ids,
        GROUP_CONCAT(DISTINCT l.titulo) as titulos_libros
       FROM autores a
       LEFT JOIN libro_autores la ON a.id = la.autor_id
       LEFT JOIN libros l ON la.libro_id = l.id
       WHERE a.id = ?
       GROUP BY a.id`,
      [id]
    );

    if (!autores[0]) {
      throw new NotFoundException(`Autor con ID ${id} no encontrado`);
    }

    return autores[0];
  }

  async actualizar(id: number, actualizarAutorDto: CrearAutorDto) {
    try {
      const [result] = await pool.query<ResultSetHeader>(
        `UPDATE autores 
         SET nombre = ?, apellido = ?, dni = ?, nacionalidad = ?
         WHERE id = ?`,
        [
          actualizarAutorDto.nombre,
          actualizarAutorDto.apellido,
          actualizarAutorDto.dni,
          actualizarAutorDto.nacionalidad,
          id
        ]
      );

      if (result.affectedRows === 0) {
        throw new NotFoundException(`Autor con ID ${id} no encontrado`);
      }

      return this.buscarPorId(id);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('El DNI ya existe en la base de datos');
      }
      throw error;
    }
  }

  async eliminar(id: number) {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM autores WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      throw new NotFoundException(`Autor con ID ${id} no encontrado`);
    }
    return { mensaje: 'Autor eliminado exitosamente' };
  }
}
