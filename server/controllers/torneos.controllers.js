import { pool } from '../db.js';

// Obtener todos los torneos
export const getTorneos = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM torneos ORDER BY created_at ASC");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Obtener un torneo por su ID
export const getOneTorneo = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM torneos WHERE id_torneo = ?", [
      req.params.id_torneo,
    ]);

    if (result.length === 0) {
      const notFoundError = new Error('Torneo not found');
      notFoundError.status = 404;
      next(notFoundError);
      return;
    }

    res.json(result[0]);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo torneo
export const createTorneo = async (req, res, next) => {
  try {
    const { nombre, id_liga } = req.body;
    const [result] = await pool.query('INSERT INTO torneos (nombre, id_liga) VALUES (?, ?)', [nombre, id_liga]);
    res.json({ message: "Torneo created", id: result.insertId, ...req.body });
  } catch (error) {
    next(error);
  }
};

// Actualizar un torneo por su ID
export const updateTorneo = async (req, res, next) => {
  try {
    const result = await pool.query("UPDATE torneos SET ? WHERE id_torneo = ?", [
      req.body,
      req.params.id_torneo,
    ]);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Eliminar un torneo por su ID
export const deleteTorneo = async (req, res, next) => {
  try {
    const [result] = await pool.query("DELETE FROM torneos WHERE id_torneo = ?", [
      req.params.id_torneo,
    ]);

    if (result.affectedRows === 0) {
      const notFoundError = new Error('Torneo not found');
      notFoundError.status = 404;
      next(notFoundError);
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const getTorneosByLiga = async (req, res, next) => {
  try {
    const idLiga = req.params.id_liga;
    const [torneos] = await pool.query('SELECT * FROM torneos WHERE id_liga = ?', [idLiga]);
    res.json(torneos);
  } catch (error) {
    next(error);
  }
};