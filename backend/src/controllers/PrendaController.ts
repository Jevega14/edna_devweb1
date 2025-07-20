import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Prenda } from '../entities/Prenda';
import { Administrador } from '../entities/Administrador';

class PrendaController {
    // --- CREAR UNA NUEVA PRENDA ---
    public async create(req: Request, res: Response): Promise<Response> {
        const { tipo, talla, logo, imagen, administrador_id } = req.body;

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
            const newPrenda = prendaRepository.create({ tipo, talla, logo, imagen, admin });
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
            const prendas = await prendaRepository.find({ relations: ['admin'] });
            return res.json(prendas);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener las prendas.', error });
        }
    }

    // --- OBTENER UNA PRENDA POR ID ---
    public async getById(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        const prendaRepository = AppDataSource.getRepository(Prenda);
        try {
            const prenda = await prendaRepository.findOne({ where: { id }, relations: ['admin'] });
            if (!prenda) {
                return res.status(404).json({ message: 'Prenda no encontrada.' });
            }
            return res.json(prenda);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener la prenda.', error });
        }
    }

    // --- ACTUALIZAR UNA PRENDA ---
    public async update(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        const { tipo, talla, logo, imagen } = req.body;
        const prendaRepository = AppDataSource.getRepository(Prenda);
        try {
            const prenda = await prendaRepository.findOneBy({ id });
            if (!prenda) {
                return res.status(404).json({ message: 'Prenda no encontrada.' });
            }
            prendaRepository.merge(prenda, { tipo, talla, logo, imagen });
            const updatedPrenda = await prendaRepository.save(prenda);
            return res.json(updatedPrenda);
        } catch (error) {
            return res.status(500).json({ message: 'Error al actualizar la prenda.', error });
        }
    }

    // --- ELIMINAR UNA PRENDA ---
    public async delete(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        const prendaRepository = AppDataSource.getRepository(Prenda);
        try {
            const result = await prendaRepository.delete(id);
            if (result.affected === 0) {
                return res.status(404).json({ message: 'Prenda no encontrada.' });
            }
            return res.status(204).send(); // No Content
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar la prenda.', error });
        }
    }
}

export default new PrendaController();
