import { pool } from '../db.js';

// Obtener todos los equipos
export const getEquipos = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM equipos ORDER BY created_at ASC");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Obtener un equipo por su ID
export const getOneEquipo = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM equipos WHERE id_equipo = ?", [
      req.params.id_equipo,
    ]);

    if (result.length === 0) {
      const notFoundError = new Error('Equipo not found');
      notFoundError.status = 404;
      next(notFoundError);
      return;
    }

    res.json(result[0]);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo equipo
export const createEquipo = async (req, res, next) => {
  try {
    const { nombre, id_torneo } = req.body;
    const [result] = await pool.query('INSERT INTO equipos (nombre, id_torneo) VALUES (?, ?)', [nombre, id_torneo]);
    res.json({ message: "Equipo created", id: result.insertId, ...req.body });
  } catch (error) {
    next(error);
  }
};

// Actualizar un equipo por su ID
export const updateEquipo = async (req, res, next) => {
  try {
    const result = await pool.query("UPDATE equipos SET ? WHERE id_equipo = ?", [
      req.body,
      req.params.id_equipo,
    ]);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Eliminar un equipo por su ID
export const deleteEquipo = async (req, res, next) => {
  try {
    const [result] = await pool.query("DELETE FROM equipos WHERE id_equipo = ?", [
      req.params.id_equipo,
    ]);

    if (result.affectedRows === 0) {
      const notFoundError = new Error('Equipo not found');
      notFoundError.status = 404;
      next(notFoundError);
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
