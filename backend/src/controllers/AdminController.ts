import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Administrador } from '../entities/Administrador';
import * as jwt from 'jsonwebtoken';

class AdminController {
    // --- LOGIN PARA ADMINISTRADORES (sin cambios) ---
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
                { id: admin.id, username: admin.username, role: 'admin' },
                process.env.JWT_SECRET as string,
                { expiresIn: '8h' }
            );

            return res.status(200).json({ token, adminId: admin.id });
        } catch (error) {
            return res.status(500).json({ message: 'Error al iniciar sesión.', error });
        }
    }

    // --- OBTENER TODOS LOS ADMINISTRADORES (sin cambios) ---
    public async getAll(req: Request, res: Response): Promise<Response> {
        const adminRepository = AppDataSource.getRepository(Administrador);
        try {
            const admins = await adminRepository.find({
                select: ["id", "nombre", "username", "email", "prendasACargo"]
            });
            return res.json(admins);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener administradores.', error });
        }
    }

    // --- CREAR UN NUEVO ADMINISTRADOR (CORREGIDO) ---
    public async create(req: Request, res: Response): Promise<Response> {
        // Ya no esperamos 'prendasACargo' del body, lo manejamos nosotros.
        const { nombre, username, email, password } = req.body;

        // Añadimos una validación explícita
        if (!nombre || !username || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios: nombre, username, email, password.' });
        }

        const adminRepository = AppDataSource.getRepository(Administrador);
        try {
            // Creamos la instancia y dejamos que el 'default: 0' de la entidad se encargue de 'prendasACargo'
            const newAdmin = adminRepository.create({ nombre, username, email, password });
            const savedAdmin = await adminRepository.save(newAdmin);

            const responseAdmin = { ...savedAdmin };
            delete (responseAdmin as any).password;

            return res.status(201).json(responseAdmin);
        } catch (error: any) {
            // Si el error es por un duplicado, damos un mensaje más claro
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'El email o nombre de usuario ya existe.' });
            }
            return res.status(500).json({ message: 'Error al crear administrador.', error: error.message });
        }
    }
}

export default new AdminController();