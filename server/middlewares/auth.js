import { verifyToken } from '../helpers/generateToken.js';

export const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = await verifyToken(token);
        if (!decodedToken) {
            const error = new Error('Invalid authentication');
            error.statusCode = 401;
            throw error;
        }
        req.userId = decodedToken._id;
        req.role = decodedToken.role;
        next();
    } catch (error) {
        next(error);
    }
}
