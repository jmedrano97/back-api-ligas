import { Router } from 'express'
const router = Router()

import { registerCtrl, loginCtrl } from '../controllers/auth.controllers.js'


//TODO: Registrar un usuario
router.post('/register', registerCtrl)
router.post('/login', loginCtrl)



export default router;