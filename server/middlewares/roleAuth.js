import { verifyToken } from '../helpers/generateToken.js';
import { pool } from '../db.js';

//comprobar si el usuario tiene el rol que se le pasa buscando en la base de datos con el id del usuario
const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = await verifyToken(token);
        const user = await pool.query("SELECT * FROM users WHERE user_id = ?", [decodedToken._id]);
        const userRole = user[0].rol_id;
        if (!roles.includes(userRole)) {
            res.status(409)
            res.send({ error: 'No tienes permisos' })
        }
        next();
    } catch (error) {
        next(error);
    }
}

export { checkRoleAuth };