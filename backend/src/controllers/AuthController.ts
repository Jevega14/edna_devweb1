// src/controllers/AuthController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Usuario } from '../entities/Usuario';
import * as jwt from 'jsonwebtoken';

class AuthController {
    // --- MÉTODO DE REGISTRO ---
    public async register(req: Request, res: Response): Promise<Response> {
        const { nombre, username, email, password, telefono, direccion } = req.body;

        // Validación simple
        if (!nombre || !username || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos obligatorios deben ser proporcionados.' });
        }

        const userRepository = AppDataSource.getRepository(Usuario);

        try {
            // Verificar si el usuario o email ya existen
            const userExists = await userRepository.findOne({ where: [{ email }, { username }] });
            if (userExists) {
                return res.status(400).json({ message: 'El email o nombre de usuario ya está en uso.' });
            }

            const newUser = new Usuario();
            newUser.nombre = nombre;
            newUser.username = username;
            newUser.email = email;
            newUser.password = password; // La contraseña se hasheará automáticamente por el hook @BeforeInsert
            newUser.telefono = telefono;
            newUser.direccion = direccion;

            const savedUser = await userRepository.save(newUser);

            // No devolver la contraseña en la respuesta
            const userResponse = { ...savedUser };
            delete (userResponse as any).password;

            return res.status(201).json(userResponse);
        } catch (error) {
            return res.status(500).json({ message: 'Error al registrar el usuario.', error });
        }
    }

    // --- MÉTODO DE LOGIN ---
    public async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
        }

        const userRepository = AppDataSource.getRepository(Usuario);

        try {
            const user = await userRepository.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ message: 'Credenciales inválidas.' }); // Usuario no encontrado
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Credenciales inválidas.' }); // Contraseña incorrecta
            }

            // Generar Token JWT
            const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' } // El token expira en 1 hora
            );

            return res.status(200).json({ token, userId: user.id });
        } catch (error) {
            return res.status(500).json({ message: 'Error al iniciar sesión.', error });
        }
    }
}

export default new AuthController();