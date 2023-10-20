import { pool } from '../db.js';

// Obtener todas las competencias
export const getCompetencias = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM competencias ORDER BY created_at ASC");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Obtener una competencia por su ID
export const getOneCompetencia = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM competencias WHERE id_competencia = ?", [
      req.params.id_competencia,
    ]);

    if (result.length === 0) {
      const notFoundError = new Error('Competencia not found');
      notFoundError.status = 404;
      next(notFoundError);
      return;
    }

    res.json(result[0]);
  } catch (error) {
    next(error);
  }
};

// Crear una nueva competencia
export const createCompetencia = async (req, res, next) => {
  try {
    const { nombre, id_torneo } = req.body;
    const [result] = await pool.query('INSERT INTO competencias (nombre, id_torneo) VALUES (?, ?)', [nombre, id_torneo]);
    res.json({ message: "Competencia created", id: result.insertId, ...req.body });
  } catch (error) {
    next(error);
  }
};

// Actualizar una competencia por su ID
export const updateCompetencia = async (req, res, next) => {
  try {
    const result = await pool.query("UPDATE competencias SET ? WHERE id_competencia = ?", [
      req.body,
      req.params.id_competencia,
    ]);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Eliminar una competencia por su ID
export const deleteCompetencia = async (req, res, next) => {
  try {
    const [result] = await pool.query("DELETE FROM competencias WHERE id_competencia = ?", [
      req.params.id_competencia,
    ]);

    if (result.affectedRows === 0) {
      const notFoundError = new Error('Competencia not found');
      notFoundError.status = 404;
      next(notFoundError);
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
