import { pool } from '../db.js';

// Obtener todas las competencias
export const getCompetitions = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM competitions ORDER BY created_at ASC");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getCompetitionsByLeague = async (req, res, next) => {
  try {
    const [result] = await pool.query(`
    SELECT c.*,tc.name as typeOfCompetitions_name FROM competitions c
    INNER JOIN typeOfCompetitions tc on tc.typeOfCompetition_id = c.typeOfCompetition_id
    WHERE c.league_id = ?`, [
          req.params.league_id,
        ]);

    if (result.length === 0) {
      const notFoundError = new Error('Competitions not found');
      notFoundError.status = 404;
      next(notFoundError);
      return;
    }

    const response = genericResponse( result, 'Competitions by league');
    res.json(response);

  } catch (error) {
    next(error);
  }
};

// Obtener una competencia por su ID
export const getOneCompetition = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM competitions WHERE competition_id = ?", [
      req.params.competition_id,
    ]);

    if (result.length === 0) {
      const notFoundError = new Error('Competition not found');
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
export const createCompetition = async (req, res, next) => {
  try {
    const { name, league_id } = req.body;
    const [result] = await pool.query('INSERT INTO competitions (name, league_id) VALUES (?, ?)', [name, league_id]);
    res.json({ message: "Competition created", competition_id: result.insertId, name, league_id });
  } catch (error) {
    next(error);
  }
};

// Actualizar una competencia por su ID
export const updateCompetition = async (req, res, next) => {
  try {
    const result = await pool.query("UPDATE competitions SET ? WHERE competition_id = ?", [
      req.body,
      req.params.competition_id,
    ]);
    res.json({ message: "Competition updated", ...req.body });
  } catch (error) {
    next(error);
  }
};

// Eliminar una competencia por su ID
export const deleteCompetition = async (req, res, next) => {
  try {
    const [result] = await pool.query("DELETE FROM competitions WHERE competition_id = ?", [
      req.params.competition_id,
    ]);

    if (result.affectedRows === 0) {
      const notFoundError = new Error('Competition not found');
      notFoundError.status = 404;
      next(notFoundError);
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const genericResponse = (result,message) => {
  const respuesta = {
    status: 200,
    data: result,
    message: message,
  };
  return respuesta;
};

