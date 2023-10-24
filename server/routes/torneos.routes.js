import { Router } from "express";
const router = Router();

import {
  getTorneos,
  getOneTorneo,
  createTorneo,
  deleteTorneo,
  updateTorneo,
  getTorneosByLiga,
} from "../controllers/torneos.controllers.js";

router.get('/api/v1/torneos', getTorneos);
router.get('/api/v1/torneo/:id_torneo', getOneTorneo);
router.post('/api/v1/torneo', createTorneo);
router.delete('/api/v1/torneo/:id_torneo', deleteTorneo);
router.put('/api/v1/torneo/:id_torneo', updateTorneo);

router.get('/api/v1/torneos/:id_liga/torneos', getTorneosByLiga);

export default router;
