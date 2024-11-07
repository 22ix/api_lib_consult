import * as mysql from 'mysql2/promise';

export const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'biblioteca'
};

export const pool = mysql.createPool(dbConfig);



// SQL para creacion iinicial de tgablas
export const crearTablas = async () => {
    try {
      const connection = await pool.getConnection();
      
      await connection.query(`
        CREATE TABLE IF NOT EXISTS autores (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(100) NOT NULL,
          apellido VARCHAR(100) NOT NULL,
          dni VARCHAR(8) NOT NULL UNIQUE,
          nacionalidad VARCHAR(100) NOT NULL
        );
      `);
  
      await connection.query(`
        CREATE TABLE IF NOT EXISTS editoriales (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(200) NOT NULL,
          direccion TEXT NOT NULL,
          cuit VARCHAR(13) NOT NULL UNIQUE
        );
      `);
  
      await connection.query(`
        CREATE TABLE IF NOT EXISTS libros (
          id INT AUTO_INCREMENT PRIMARY KEY,
          titulo VARCHAR(200) NOT NULL,
          categoria VARCHAR(100) NOT NULL,
          precio DECIMAL(10,2) NOT NULL,
          fecha_lanzamiento DATE NOT NULL,
          descripcion TEXT NOT NULL,
          editorial_id INT NOT NULL,
          FOREIGN KEY (editorial_id) REFERENCES editoriales(id)
        );
      `);
  
      await connection.query(`
        CREATE TABLE IF NOT EXISTS libro_autores (
          libro_id INT,
          autor_id INT,
          PRIMARY KEY (libro_id, autor_id),
          FOREIGN KEY (libro_id) REFERENCES libros(id) ON DELETE CASCADE,
          FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE CASCADE
        );
      `);
  
      connection.release();
      console.log('Tablas creadas exitosamente');
    } catch (error) {
      console.error('Error creando tablas:', error);
      throw error;
    }
  };