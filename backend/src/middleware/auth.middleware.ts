import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// Extendemos la interfaz Request de Express para poder añadir nuestros propios datos.
// Así, TypeScript sabrá que `req.user` existe y qué contiene.
export interface AuthRequest extends Request {
    user?: { id: number; username: string; role?: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    // 1. Buscamos el token en la cabecera 'Authorization'.
    // El formato estándar es "Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        // Si no se proporciona un token, denegamos el acceso.
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    try {
        // 2. Verificamos que el token sea válido usando nuestro secreto del .env
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET as string);

        // 3. Si es válido, adjuntamos los datos decodificados del usuario a la petición.
        // Ahora, los controladores que se ejecuten después de este middleware
        // podrán saber qué usuario está haciendo la petición.
        req.user = decodedPayload as { id: number; username: string; role?: string };

        // 4. ¡El guardia da paso! Continuamos hacia la siguiente función (el controlador).
        next();
    } catch (error) {
        // Si el token es inválido (malformado, expirado, etc.), devolvemos un error.
        return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
};
