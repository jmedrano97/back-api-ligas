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

    const response = genericResponse( result[0], 'League by link');
    res.json(response);
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


// ESPECIALES
export const getPositionTableByCompetition = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      `SELECT 
      teamCompetition.team_competition_id,
      teamCompetition.team_id,
      teams.name as team_name,
      teamCompetition.competition_id,
      competitions.name as competition_name,
      teamCompetition.games_played,
      teamCompetition.games_won,
      teamCompetition.games_drawn,
      teamCompetition.games_lost,
      teamCompetition.goals_for,
      teamCompetition.goals_against,
      teamCompetition.goals_difference,
      teamCompetition.points,
      teamCompetition.still_alive
      FROM teamCompetition 
      INNER JOIN teams on teams.team_id = teamCompetition.team_id
      INNER JOIN competitions on competitions.competition_id = teamCompetition.competition_id
      WHERE teamCompetition.competition_id = ?`, 
      [req.params.competition_id,]
      );

    if (result.length === 0) {
      const notFoundError = new Error('League not found');
      notFoundError.status = 404;
      next(notFoundError);
      return;
    }

    const response = genericResponse(result, 'Position table');
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getMatchesByCompetition = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      `
      Select 
      matches.match_id,
      matches.competition_id,
      c.name as competition_name,
      matches.home_team_id,
      t.name as home_team_name,
      matches.away_team_id,
      t2.name as away_team_name,
      matches.home_team_score,
      matches.away_team_score,
      matches.match_date,
      matches.created_at,
      matches.finished
      from matches
      INNER JOIN competitions c on c.competition_id = matches.competition_id
      INNER JOIN teams t on t.team_id = matches.home_team_id
      INNER JOIN teams t2 on t2.team_id = matches.away_team_id
      WHERE c.competition_id = 1
      `, 
      [req.params.competition_id,]
      );

    if (result.length === 0) {
      const notFoundError = new Error('League not found');
      notFoundError.status = 404;
      next(notFoundError);
      return;
    }

    const response = genericResponse(result, 'Matches by competition');
    res.json(response);
  } catch (error) {
    next(error);
  }
}


const genericResponse = (result,message) => {
  const respuesta = {
    status: 200,
    data: result,
    message: message,
  };
  return respuesta;
};

