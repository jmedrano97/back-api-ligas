import { Router } from "express";
const router = Router();

import {
    getLigas,
    getOneLiga,
    createLiga,
    deleteLiga,
    updateLiga
} from "../controllers/ligas.controllers.js";

router.get('/ligas', getLigas);
router.get('/liga/:id_liga', getOneLiga);
router.post('/ligas', createLiga);
router.delete('/liga/:id_liga', deleteLiga);
router.put('/liga/:id_liga', updateLiga);



export default router;


