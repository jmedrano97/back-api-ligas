import { Router } from "express";
const router = Router();

import {
  getEquipos,
  getOneEquipo,
  createEquipo,
  deleteEquipo,
  updateEquipo
} from "../controllers/equipos.controllers.js";

router.get('/api/v1/equipos', getEquipos);
router.get('/api/v1/equipo/:id_equipo', getOneEquipo);
router.post('/api/v1/equipo', createEquipo);
router.delete('/api/v1/equipo/:id_equipo', deleteEquipo);
router.put('/api/v1/equipo/:id_equipo', updateEquipo);

export default router;
