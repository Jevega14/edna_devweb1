// src/controllers/AdminController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Administrador } from '../entities/Administrador';
import * as jwt from 'jsonwebtoken';

class AdminController {
    // --- LOGIN PARA ADMINISTRADORES ---
    public async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
        }

        const adminRepository = AppDataSource.getRepository(Administrador);
        try {
            const admin = await adminRepository.findOne({ where: { email } });

            if (!admin || !(await admin.comparePassword(password))) {
                return res.status(401).json({ message: 'Credenciales de administrador inválidas.' });
            }

            const token = jwt.sign(
                { id: admin.id, username: admin.username, role: 'admin' }, // Añadimos un rol
                process.env.JWT_SECRET as string,
                { expiresIn: '8h' }
            );

            return res.status(200).json({ token, adminId: admin.id });
        } catch (error) {
            return res.status(500).json({ message: 'Error al iniciar sesión.', error });
        }
    }

    // --- OBTENER TODOS LOS ADMINISTRADORES ---
    public async getAll(req: Request, res: Response): Promise<Response> {
        const adminRepository = AppDataSource.getRepository(Administrador);
        try {
            const admins = await adminRepository.find({
                select: ["id", "nombre", "username", "email", "prendasACargo"] // Excluimos la contraseña
            });
            return res.json(admins);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener administradores.', error });
        }
    }

    // --- CREAR UN NUEVO ADMINISTRADOR ---
    public async create(req: Request, res: Response): Promise<Response> {
        const { nombre, username, email, password, prendasACargo } = req.body;

        const adminRepository = AppDataSource.getRepository(Administrador);
        try {
            const newAdmin = adminRepository.create({ nombre, username, email, password, prendasACargo });
            const savedAdmin = await adminRepository.save(newAdmin);

            const responseAdmin = { ...savedAdmin };
            delete (responseAdmin as any).password;

            return res.status(201).json(responseAdmin);
        } catch (error) {
            return res.status(500).json({ message: 'Error al crear administrador.', error });
        }
    }
}

export default new AdminController();