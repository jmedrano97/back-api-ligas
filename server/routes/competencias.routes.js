import { Router } from "express";
const router = Router();

import {
  getCompetencias,
  getOneCompetencia,
  createCompetencia,
  deleteCompetencia,
  updateCompetencia
} from "../controllers/competencias.controllers.js";

router.get('/competencias', getCompetencias);
router.get('/competencia/:id_competencia', getOneCompetencia);
router.post('/competencia', createCompetencia);
router.delete('/competencia/:id_competencia', deleteCompetencia);
router.put('/competencia/:id_competencia', updateCompetencia);

export default router;

