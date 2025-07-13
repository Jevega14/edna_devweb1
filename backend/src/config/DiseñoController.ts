// src/controllers/DiseñoController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Diseño } from '../entities/Diseno';
import { Usuario } from '../entities/Usuario';
import { Prenda } from '../entities/Prenda';
import { Material } from '../entities/Material';

class DiseñoController {
    // --- MÉTODO PARA CREAR UN NUEVO DISEÑO ---
    public async create(req: Request, res: Response): Promise<Response> {
        const { nombre, usuario_id, prenda_id, material_id } = req.body;

        // Validación de datos de entrada
        if (!nombre || !usuario_id || !prenda_id || !material_id) {
            return res.status(400).json({ message: 'Los campos nombre, usuario_id, prenda_id y material_id son obligatorios.' });
        }

        const diseñoRepository = AppDataSource.getRepository(Diseno);

        try {
            // Verificamos que las entidades relacionadas existan
            const usuario = await AppDataSource.manager.findOneBy(Usuario, { id: usuario_id });
            const prenda = await AppDataSource.manager.findOneBy(Prenda, { id: prenda_id });
            const material = await AppDataSource.manager.findOneBy(Material, { id: material_id });

            if (!usuario || !prenda || !material) {
                return res.status(404).json({ message: 'Usuario, Prenda o Material no encontrado.' });
            }

            // Creamos la nueva instancia de Diseño
            const nuevoDiseño = diseñoRepository.create({
                nombre,
                usuario, // Pasamos el objeto completo
                prenda,  // Pasamos el objeto completo
                material // Pasamos el objeto completo
            });

            // Guardamos en la base de datos
            const savedDiseño = await diseñoRepository.save(nuevoDiseño);

            return res.status(201).json(savedDiseño);
        } catch (error) {
            return res.status(500).json({ message: 'Error al crear el diseño.', error });
        }
    }

    // --- MÉTODO PARA OBTENER TODOS LOS DISEÑOS ---
    public async getAll(req: Request, res: Response): Promise<Response> {
        const diseñoRepository = AppDataSource.getRepository(Diseno);
        try {
            // Usamos la opción 'relations' para que la respuesta incluya los datos completos
            // de las tablas relacionadas, no solo sus IDs.
            const diseños = await diseñoRepository.find({
                relations: ['usuario', 'prenda', 'material'],
            });
            return res.status(200).json(diseños);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener los diseños.', error });
        }
    }
}

export default new DisenoController();