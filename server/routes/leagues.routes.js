import { Router } from "express";
const router = Router();

import {
    getLeagues,
    getOneLeague,
    createLeague,
    deleteLeague,
    updateLeague
} from "../controllers/leagues.controllers.js";

router.get('/api/v1/leagues', getLeagues);
router.get('/api/v1/league/:league_id', getOneLeague);
router.post('/api/v1/league', createLeague);
router.delete('/api/v1/league/:league_id', deleteLeague);
router.put('/api/v1/league/:league_id', updateLeague);

export default router;
