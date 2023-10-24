import { Router } from "express";
const router = Router();

import {
    getLigas,
    getOneLiga,
    createLiga,
    deleteLiga,
    updateLiga
} from "../controllers/ligas.controllers.js";

router.get('/api/v1/ligas', getLigas);
router.get('/api/v1/liga/:id_liga', getOneLiga);
router.post('/api/v1/liga', createLiga);
router.delete('/api/v1/liga/:id_liga', deleteLiga);
router.put('/api/v1/liga/:id_liga', updateLiga);



export default router;


