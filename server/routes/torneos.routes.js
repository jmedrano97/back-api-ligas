import { Router } from "express";
const router = Router();

import {
  getTorneos,
  getOneTorneo,
  createTorneo,
  deleteTorneo,
  updateTorneo
} from "../controllers/torneos.controllers.js";

router.get('/torneos', getTorneos);
router.get('/torneo/:id_torneo', getOneTorneo);
router.post('/torneo', createTorneo);
router.delete('/torneo/:id_torneo', deleteTorneo);
router.put('/torneo/:id_torneo', updateTorneo);

export default router;
