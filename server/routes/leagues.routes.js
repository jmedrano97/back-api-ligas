import { Router } from "express";
const router = Router();

import { checkAuth } from "../middlewares/auth.js";
import { checkRoleAuth } from "../middlewares/roleAuth.js";

import {
    getLeagues,
    getOneLeague,
    getLeagueByLink,
    createLeague,
    deleteLeague,
    updateLeague,
    
    // Especial
    getPositionTableByCompetition,
    getMatchesByCompetition
} from "../controllers/leagues.controllers.js";

router.get('/api/v1/leagues', getLeagues);
router.get('/api/v1/league/:league_id', getOneLeague);
router.get('/api/v1/leagueByLink/:league_link', getLeagueByLink);
router.post('/api/v1/league', createLeague);
router.delete('/api/v1/league/:league_id', deleteLeague);
router.put('/api/v1/league/:league_id', updateLeague);

// ESPECIALES
router.get('/api/v1/positionTableByCompetition/:competition_id', getPositionTableByCompetition);
router.get('/api/v1/matchesByCompetition/:competition_id', getMatchesByCompetition);

export default router;
