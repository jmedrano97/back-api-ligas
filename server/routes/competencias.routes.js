import { Router } from "express";
const router = Router();

import {
  getCompetencias,
  getOneCompetencia,
  createCompetencia,
  deleteCompetencia,
  updateCompetencia
} from "../controllers/competencias.controllers.js";

router.get('/api/v1/competencias', getCompetencias);
router.get('/api/v1/competencia/:id_competencia', getOneCompetencia);
router.post('/api/v1/competencia', createCompetencia);
router.delete('/api/v1/competencia/:id_competencia', deleteCompetencia);
router.put('/api/v1/competencia/:id_competencia', updateCompetencia);

export default router;

