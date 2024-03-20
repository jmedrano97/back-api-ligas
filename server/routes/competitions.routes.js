import { Router } from "express";
const router = Router();

import {
  getCompetitions,
  getOneCompetition,
  createCompetition,
  deleteCompetition,
  updateCompetition,
  getCompetitionsByLeague
} from "../controllers/competitions.controllers.js";

router.get('/api/v1/competitions', getCompetitions);
router.get('/api/v1/competitionsByLeague/:league_id', getCompetitionsByLeague);
router.get('/api/v1/competition/:competition_id', getOneCompetition);
router.post('/api/v1/competition', createCompetition);
router.delete('/api/v1/competition/:competition_id', deleteCompetition);
router.put('/api/v1/competition/:competition_id', updateCompetition);

export default router;
