import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { pool } from '../config/database.config';
import { CrearEditorialDto } from './dto/crear-editorial.dto';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

@Injectable()
export class EditorialesService {
  async crear(crearEditorialDto: CrearEditorialDto) {
    try {
      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO editoriales (nombre, direccion, cuit)
         VALUES (?, ?, ?)`,
        [
          crearEditorialDto.nombre,
          crearEditorialDto.direccion,
          crearEditorialDto.cuit
        ]
      );

      return this.buscarPorId(result.insertId);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('El CUIT ya existe en la base de datos');
      }
      throw error;
    }
  }

  async buscarTodos(pagina = 1, limite = 10) {
    const offset = (pagina - 1) * limite;
    
    const [editoriales] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM editoriales LIMIT ? OFFSET ?`,
      [limite, offset]
    );

    const [totalRows] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as total FROM editoriales'
    );
    const total = totalRows[0].total;

    return {
      datos: editoriales,
      total,
      pagina,
      limite
    };
  }

  async buscarPorId(id: number) {
    const [editoriales] = await pool.query<RowDataPacket[]>(
      `SELECT 
        e.*,
        GROUP_CONCAT(DISTINCT l.id) as libro_ids,
        GROUP_CONCAT(DISTINCT l.titulo) as titulos_libros
       FROM editoriales e
       LEFT JOIN libros l ON e.id = l.editorial_id
       WHERE e.id = ?
       GROUP BY e.id`,
      [id]
    );

    if (!editoriales[0]) {
      throw new NotFoundException(`Editorial con ID ${id} no encontrada`);
    }

    return editoriales[0];
  }

  async actualizar(id: number, actualizarEditorialDto: CrearEditorialDto) {
    try {
      const [result] = await pool.query<ResultSetHeader>(
        `UPDATE editoriales 
         SET nombre = ?, direccion = ?, cuit = ?
         WHERE id = ?`,
        [
          actualizarEditorialDto.nombre,
          actualizarEditorialDto.direccion,
          actualizarEditorialDto.cuit,
          id
        ]
      );

      if (result.affectedRows === 0) {
        throw new NotFoundException(`Editorial con ID ${id} no encontrada`);
      }

      return this.buscarPorId(id);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('El CUIT ya existe en la base de datos');
      }
      throw error;
    }
  }

  async eliminar(id: number) {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM editoriales WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      throw new NotFoundException(`Editorial con ID ${id} no encontrada`);
    }
    return { mensaje: 'Editorial eliminada exitosamente' };
  }
}