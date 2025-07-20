import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Material } from '../entities/Material';
import { Administrador } from '../entities/Administrador';
import { AuthRequest } from '../middleware/auth.middleware'; // Importamos la interfaz

class MaterialController {
    // --- CREAR UN NUEVO MATERIAL ---
    public async create(req: AuthRequest, res: Response): Promise<Response> {
        const { tela, color, costo } = req.body;
        const administrador_id = req.user?.id; // Obtenemos el ID del admin desde el token

        if (!tela || !color || !costo || !administrador_id) {
            return res.status(400).json({ message: 'Los campos tela, color y costo son requeridos.' });
        }

        const materialRepository = AppDataSource.getRepository(Material);
        try {
            const admin = await AppDataSource.manager.findOneBy(Administrador, { id: administrador_id });
            if (!admin) {
                return res.status(404).json({ message: 'Administrador no encontrado.' });
            }

            const newMaterial = materialRepository.create({
                tela,
                color,
                costo,
                admin,
            });
            const savedMaterial = await materialRepository.save(newMaterial);
            return res.status(201).json(savedMaterial);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error al crear el material.', error: error.message });
        }
    }

    // --- OBTENER TODOS LOS MATERIALES (Público) ---
    public async getAll(req: Request, res: Response): Promise<Response> {
        const materialRepository = AppDataSource.getRepository(Material);
        try {
            const materiales = await materialRepository.find({ relations: ['admin'] });
            return res.json(materiales);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error al obtener los materiales.', error: error.message });
        }
    }

    // --- OBTENER UN MATERIAL POR ID (Público) ---
    public async getById(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        const materialRepository = AppDataSource.getRepository(Material);
        try {
            const material = await materialRepository.findOne({ where: { id }, relations: ['admin'] });
            if (!material) {
                return res.status(404).json({ message: 'Material no encontrado.' });
            }
            return res.json(material);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error al obtener el material.', error: error.message });
        }
    }

    // --- OBTENER MATERIALES DEL ADMINISTRADOR AUTENTICADO ---
    public async getByAdmin(req: AuthRequest, res: Response): Promise<Response> {
        const adminId = req.user?.id;
        if (!adminId) {
            return res.status(400).json({ message: 'ID de administrador no encontrado en el token.' });
        }

        const materialRepository = AppDataSource.getRepository(Material);
        try {
            const materiales = await materialRepository.find({
                where: { admin: { id: adminId } },
            });
            return res.json(materiales);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error al obtener los materiales.', error: error.message });
        }
    }

    // --- ACTUALIZAR UN MATERIAL (CON VERIFICACIÓN DE PROPIEDAD) ---
    public async update(req: AuthRequest, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        const adminId = req.user?.id;
        const { tela, color, costo } = req.body;

        const materialRepository = AppDataSource.getRepository(Material);
        try {
            const material = await materialRepository.findOne({ where: { id }, relations: ['admin'] });
            if (!material) {
                return res.status(404).json({ message: 'Material no encontrado.' });
            }
            if (material.admin.id !== adminId) {
                return res.status(403).json({ message: 'No tienes permiso para editar este material.' });
            }

            materialRepository.merge(material, { tela, color, costo });
            const updatedMaterial = await materialRepository.save(material);
            return res.json(updatedMaterial);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error al actualizar el material.', error: error.message });
        }
    }

    // --- ELIMINAR UN MATERIAL (CON VERIFICACIÓN DE PROPIEDAD) ---
    public async delete(req: AuthRequest, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        const adminId = req.user?.id;

        const materialRepository = AppDataSource.getRepository(Material);
        try {
            const material = await materialRepository.findOne({ where: { id }, relations: ['admin'] });
            if (!material) {
                return res.status(404).json({ message: 'Material no encontrado.' });
            }
            if (material.admin.id !== adminId) {
                return res.status(403).json({ message: 'No tienes permiso para eliminar este material.' });
            }

            await materialRepository.remove(material);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(500).json({ message: 'Error al eliminar el material.', error: error.message });
        }
    }
}

export default new MaterialController();