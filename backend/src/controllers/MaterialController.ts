// src/controllers/MaterialController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Material } from '../entities/Material';
import { Administrador } from '../entities/Administrador';

class MaterialController {
    // --- CREAR UN NUEVO MATERIAL ---
    public async create(req: Request, res: Response): Promise<Response> {
        const { tela, color, costo, administrador_id } = req.body;

        if (!tela || !color || !costo || !administrador_id) {
            return res.status(400).json({ message: 'Todos los campos son requeridos.' });
        }

        const materialRepository = AppDataSource.getRepository(Material);
        try {
            const admin = await AppDataSource.manager.findOneBy(Administrador, { id: administrador_id });
            if (!admin) {
                return res.status(404).json({ message: 'Administrador no encontrado.' });
            }

            const nuevoMaterial = materialRepository.create({
                tela,
                color,
                costo,
                admin, // Asignamos la instancia completa del admin
            });

            const savedMaterial = await materialRepository.save(nuevoMaterial);
            return res.status(201).json(savedMaterial);
        } catch (error) {
            return res.status(500).json({ message: 'Error al crear el material.', error });
        }
    }

    // --- OBTENER TODOS LOS MATERIALES ---
    public async getAll(req: Request, res: Response): Promise<Response> {
        const materialRepository = AppDataSource.getRepository(Material);
        try {
            const materiales = await materialRepository.find({ relations: ['admin'] });
            return res.json(materiales);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener los materiales.', error });
        }
    }

    // --- OBTENER UN MATERIAL POR ID ---
    public async getById(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        const materialRepository = AppDataSource.getRepository(Material);
        try {
            const material = await materialRepository.findOne({ where: { id }, relations: ['admin'] });
            if (!material) {
                return res.status(404).json({ message: 'Material no encontrado.' });
            }
            return res.json(material);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener el material.', error });
        }
    }

    // --- ACTUALIZAR UN MATERIAL ---
    public async update(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        const { tela, color, costo } = req.body;
        const materialRepository = AppDataSource.getRepository(Material);
        try {
            const material = await materialRepository.findOneBy({ id });
            if (!material) {
                return res.status(404).json({ message: 'Material no encontrado.' });
            }
            materialRepository.merge(material, { tela, color, costo });
            const updatedMaterial = await materialRepository.save(material);
            return res.json(updatedMaterial);
        } catch (error) {
            return res.status(500).json({ message: 'Error al actualizar el material.', error });
        }
    }

    // --- ELIMINAR UN MATERIAL ---
    public async delete(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        const materialRepository = AppDataSource.getRepository(Material);
        try {
            const result = await materialRepository.delete(id);
            if (result.affected === 0) {
                return res.status(404).json({ message: 'Material no encontrado.' });
            }
            return res.status(204).send(); // 204 No Content
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar el material.', error });
        }
    }
}
export default new MaterialController();