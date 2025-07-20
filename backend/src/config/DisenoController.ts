import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Diseno } from '../entities/Diseno';
import { Usuario } from '../entities/Usuario';
import { Prenda } from '../entities/Prenda';
import { Material } from '../entities/Material';

class DisenoController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { nombre, usuario_id, prenda_id, material_id } = req.body;

        if (!nombre || !usuario_id || !prenda_id || !material_id) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const disenoRepository = AppDataSource.getRepository(Diseno);
        try {
            const usuario = await AppDataSource.manager.findOneBy(Usuario, { id: usuario_id });
            const prenda = await AppDataSource.manager.findOneBy(Prenda, { id: prenda_id });
            const material = await AppDataSource.manager.findOneBy(Material, { id: material_id });

            if (!usuario || !prenda || !material) {
                return res.status(404).json({ message: 'Usuario, Prenda o Material no encontrado.' });
            }

            const nuevoDiseno = disenoRepository.create({
                nombre,
                usuario,
                prenda,
                material,
            });

            const savedDiseno = await disenoRepository.save(nuevoDiseno);
            return res.status(201).json(savedDiseno);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error al crear el diseno.', error: error.message });
        }
    }

    public async getAll(req: Request, res: Response): Promise<Response> {
        const disenoRepository = AppDataSource.getRepository(Diseno); // <-- CORREGIDO
        try {
            const disenos = await disenoRepository.find({ // <-- CORREGIDO
                relations: ['usuario', 'prenda', 'material'],
            });
            return res.status(200).json(disenos); // <-- CORREGIDO
        } catch (error: any) {
            return res.status(500).json({ message: 'Error al obtener los disenos.', error: error.message });
        }
    }
}

export default new DisenoController();