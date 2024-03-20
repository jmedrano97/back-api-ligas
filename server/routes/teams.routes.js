import { Router } from "express";
const router = Router();

import {
  getTeams,
  getOneTeam,
  createTeam,
  deleteTeam,
  updateTeam,
  getTeamsByLeague // Nueva ruta para obtener equipos por ID de liga
} from "../controllers/teams.controllers.js";

router.get('/api/v1/teams', getTeams);
router.get('/api/v1/teamsByLeague/:league_id', getTeamsByLeague); // Ruta para obtener equipos por ID de liga
router.get('/api/v1/team/:team_id', getOneTeam);
router.post('/api/v1/team', createTeam);
router.delete('/api/v1/team/:team_id', deleteTeam);
router.put('/api/v1/team/:team_id', updateTeam);

export default router;
