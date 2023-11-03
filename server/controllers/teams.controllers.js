import { pool } from '../db.js';

// Obtener todos los equipos
export const getTeams = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM teams ORDER BY created_at ASC");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Obtener un equipo por su ID
export const getOneTeam = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM teams WHERE team_id = ?", [
      req.params.team_id,
    ]);

    if (result.length === 0) {
      const notFoundError = new Error('Team not found');
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
export const createTeam = async (req, res, next) => {
  try {
    const { name, league_id } = req.body;
    const [result] = await pool.query('INSERT INTO teams (name, league_id) VALUES (?, ?)', [name, league_id]);
    res.json({ message: "Team created", team_id: result.insertId, name, league_id });
  } catch (error) {
    next(error);
  }
};

// Actualizar un equipo por su ID
export const updateTeam = async (req, res, next) => {
  try {
    const result = await pool.query("UPDATE teams SET ? WHERE team_id = ?", [
      req.body,
      req.params.team_id,
    ]);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Eliminar un equipo por su ID
export const deleteTeam = async (req, res, next) => {
  try {
    const [result] = await pool.query("DELETE FROM teams WHERE team_id = ?", [
      req.params.team_id,
    ]);

    if (result.affectedRows === 0) {
      const notFoundError = new Error('Team not found');
      notFoundError.status = 404;
      next(notFoundError);
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// Obtener equipos por ID de liga
export const getTeamsByLeague = async (req, res, next) => {
  try {
    const leagueId = req.params.league_id;
    const [teams] = await pool.query('SELECT * FROM teams WHERE league_id = ?', [leagueId]);
    res.json(teams);
  } catch (error) {
    next(error);
  }
};
