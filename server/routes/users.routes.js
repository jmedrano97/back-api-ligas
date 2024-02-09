// Rutas para la gestión de usuarios
import {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
  } from '../controllers/users.controllers.js';
  
  // Ruta para el registro de usuario
  router.post('/api/v1/user/register', registerUser);
  
  // // Ruta para el inicio de sesión de usuario
  // router.post('/api/v1/user/login', loginUser);
  
  // // Ruta para ver el perfil del usuario (requiere autenticación)
  // router.get('/api/v1/user/profile', /* middleware de autenticación */, getUserProfile);
  
  // // Ruta para actualizar el perfil del usuario (requiere autenticación)
  // router.put('/api/v1/user/profile', /* middleware de autenticación */, updateUserProfile);
  
  export default router;