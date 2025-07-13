// src/controllers/PrendaController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Prenda } from '../entities/Prenda';
import { Administrador } from '../entities/Administrador';

class PrendaController {
    // --- CREAR UNA NUEVA PRENDA ---
    public async create(req: Request, res: Response): Promise<Response> {
        const { tipo, talla, logo, imagen, administrador_id } = req.body;

        // Validación
        if (!tipo || !talla || !administrador_id) {
            return res.status(400).json({ message: 'Los campos tipo, talla y administrador_id son obligatorios.' });
        }

        const prendaRepository = AppDataSource.getRepository(Prenda);
        const adminRepository = AppDataSource.getRepository(Administrador);

        try {
            const admin = await adminRepository.findOne({ where: { id: administrador_id } });
            if (!admin) {
                return res.status(404).json({ message: 'Administrador no encontrado.' });
            }

            const newPrenda = prendaRepository.create({
                tipo,
                talla,
                logo,
                imagen,
                admin, // Asignamos la instancia completa del administrador
            });

            const savedPrenda = await prendaRepository.save(newPrenda);
            return res.status(201).json(savedPrenda);

        } catch (error) {
            return res.status(500).json({ message: 'Error al crear la prenda.', error });
        }
    }

    // --- OBTENER TODAS LAS PRENDAS ---
    public async getAll(req: Request, res: Response): Promise<Response> {
        const prendaRepository = AppDataSource.getRepository(Prenda);
        try {
            // Usamos 'relations' para que también traiga la información del administrador asociado
            const prendas = await prendaRepository.find({ relations: ['admin'] });
            return res.json(prendas);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener las prendas.', error });
        }
    }
}

export default new PrendaController();