// src/controllers/DisenoController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Diseno } from '../entities/Diseno';
import { Usuario } from '../entities/Usuario';
import { Prenda } from '../entities/Prenda';
import { Material } from '../entities/Material';

class DisenoController {
    // --- MÉTODO PARA CREAR UN NUEVO DISEÑO ---
    public async create(req: Request, res: Response): Promise<Response> {
        const {
            nombre,
            usuario_id,
            prenda_id,
            material_id,
            talla,
            colores,
            logo,
            imagen,
            costo
        } = req.body;

        if (!nombre || !usuario_id || !prenda_id || !material_id) {
            return res.status(400).json({ message: 'Nombre, usuario, prenda y material son obligatorios.' });
        }

        const disenoRepo = AppDataSource.getRepository(Diseno);
        try {
            const usuario = await AppDataSource.manager.findOneBy(Usuario, { id: usuario_id });
            const prenda = await AppDataSource.manager.findOneBy(Prenda, { id: prenda_id });
            const material = await AppDataSource.manager.findOneBy(Material, { id: material_id });

            if (!usuario || !prenda || !material) {
                return res.status(404).json({ message: 'Usuario, Prenda o Material no encontrado.' });
            }

            const nuevoDiseno = disenoRepo.create({
                nombre,
                usuario,
                prenda,
                material,
                talla,
                colores,
                logo,
                imagen,
                costo
            });

            const savedDiseno = await disenoRepo.save(nuevoDiseno);
            return res.status(201).json(savedDiseno);

        } catch (error: any) {
            return res.status(500).json({ message: 'Error al crear el diseño', error: error.message });
        }
    }

    // --- MÉTODO PARA OBTENER TODOS LOS DISEÑOS ---
    public async getAll(req: Request, res: Response): Promise<Response> {
        const disenoRepository = AppDataSource.getRepository(Diseno);
        try {
            // Usamos la opción 'relations' para que la respuesta incluya los datos completos
            // de las tablas relacionadas, no solo sus IDs.
            const disenos = await disenoRepository.find({
                relations: ['usuario', 'prenda', 'material'],
            });
            return res.status(200).json(disenos);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error al obtener los diseños.', error: error.message });
        }
    }
}

export default new DisenoController();