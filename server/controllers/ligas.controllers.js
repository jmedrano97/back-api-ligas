import {pool} from '../db.js'

export const getLigas = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM ligas ORDER BY created_at ASC");
    res.json(result);
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

export const getOneLiga = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM ligas WHERE id_liga = ?", [
      req.params.id_liga,
    ]);

    if (result.length === 0) {
      const notFoundError = new Error('Liga not found');
      notFoundError.status = 404;
      next(notFoundError); // Pasa el error personalizado al middleware de manejo de errores
      return;
    }

    res.json(result[0]);
  } catch (error) {
    next(error);
  }
};

export const createLiga = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const [result] = await pool.query('INSERT INTO ligas (nombre, descripcion) VALUES (?, ?)', [name, description]);
    res.json({ message: "createLiga", id: result.insertId, ...req.body });
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

export const updateLiga = async (req, res, next) => {
  try {
    const result = await pool.query("UPDATE ligas SET ? WHERE id_liga = ?", [
      req.body,
      req.params.id_liga,
    ]);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteLiga = async (req, res, next) => {
  try {
    const [result] = await pool.query("DELETE FROM ligas WHERE id_liga = ?", [
      req.params.id_liga,
    ]);

    if (result.affectedRows === 0) {
      const notFoundError = new Error('Liga not found');
      notFoundError.status = 404;
      next(notFoundError); // Pasa el error personalizado al middleware de manejo de errores
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
