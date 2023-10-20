import { Router } from "express";
const router = Router();

import {
  getEquipos,
  getOneEquipo,
  createEquipo,
  deleteEquipo,
  updateEquipo
} from "../controllers/equipos.controllers.js";

router.get('/equipos', getEquipos);
router.get('/equipo/:id_equipo', getOneEquipo);
router.post('/equipo', createEquipo);
router.delete('/equipo/:id_equipo', deleteEquipo);
router.put('/equipo/:id_equipo', updateEquipo);

export default router;
