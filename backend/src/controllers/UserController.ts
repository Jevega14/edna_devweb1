import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Usuario } from '../entities/Usuario';

class UserController {
    // --- OBTENER PERFIL DE USUARIO POR ID ---
    public async getProfile(req: Request, res: Response): Promise<Response> {
        const userId = parseInt(req.params.id);

        const userRepository = AppDataSource.getRepository(Usuario);
        try {
            const user = await userRepository.findOne({ where: { id: userId } });

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }

            // Importante: Excluimos la contraseña de la respuesta por seguridad
            const { password, ...userProfile } = user;

            return res.json(userProfile);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener el perfil.', error });
        }
    }

    // --- ACTUALIZAR PERFIL DE USUARIO ---
    public async updateProfile(req: Request, res: Response): Promise<Response> {
        const userId = parseInt(req.params.id);
        const { nombre, username, direccion, telefono } = req.body;

        const userRepository = AppDataSource.getRepository(Usuario);
        try {
            const user = await userRepository.findOneBy({ id: userId });

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }

            // Actualizamos solo los campos que se envían
            userRepository.merge(user, { nombre, username, direccion, telefono });
            const updatedUser = await userRepository.save(user);

            const { password, ...userProfile } = updatedUser;

            return res.json(userProfile);
        } catch (error) {
            return res.status(500).json({ message: 'Error al actualizar el perfil.', error });
        }
    }
}

export default new UserController();