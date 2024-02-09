import { pool } from '../db.js';
//Checar funcionamiento 
// Obtener todas las ligas
export const getLeagues = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM leagues ORDER BY created_at ASC");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Obtener una sola liga por ID
export const getOneLeague = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM leagues WHERE league_id = ?", [
      req.params.league_id,
    ]);

    if (result.length === 0) {
      const notFoundError = new Error('League not found');
      notFoundError.status = 404;
      next(notFoundError);
      return;
    }

    res.json(result[0]);
  } catch (error) {
    next(error);
  }
};

// Obtener una sola liga por ID
export const getLeagueByLink = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM leagues WHERE league_link = ?", [
      req.params.league_link,
    ]);

    if (result.length === 0) {
      const notFoundError = new Error('League not found');
      notFoundError.status = 404;
      next(notFoundError);
      return;
    }

    res.json(result[0]);
  } catch (error) {
    next(error);
  }
};

// Crear una nueva liga
export const createLeague = async (req, res, next) => {
  try {
    const { name, description,league_link,img } = req.body;
    const [result] = await pool.query("INSERT INTO leagues SET ?", [
      {
        name,
        description,
        league_link,
        img,
      },
    ]);
    res.json({ message: "League created", league_id: result.insertId, name, description });
  } catch (error) {
    next(error);
  }
};

// Actualizar una liga existente por ID
export const updateLeague = async (req, res, next) => {
  try {
    const result = await pool.query("UPDATE leagues SET ? WHERE league_id = ?", [
      req.body,
      req.params.league_id,
    ]);
    res.json({ message: "League updated", ...req.body });
  } catch (error) {
    next(error);
  }
};

// Eliminar una liga por ID
export const deleteLeague = async (req, res, next) => {
  try {
    const [result] = await pool.query("DELETE FROM leagues WHERE league_id = ?", [
      req.params.league_id,
    ]);

    if (result.affectedRows === 0) {
      const notFoundError = new Error('League not found');
      notFoundError.status = 404;
      next(notFoundError);
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
