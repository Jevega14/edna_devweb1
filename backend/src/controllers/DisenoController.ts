import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Diseno } from '../entities/Diseno';
import { Administrador } from '../entities/Administrador';
import { Prenda } from '../entities/Prenda';
import { Material } from '../entities/Material';
import { AuthRequest } from '../middleware/auth.middleware'; // Importamos la interfaz para peticiones autenticadas

class DisenoController {
    // --- CREAR UN NUEVO DISEÑO (ADMINISTRADOR) ---
    public async create(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const { nombre, prenda_id, material_id } = req.body;
            const adminId = req.user?.id; // Obtenemos el ID del admin desde el token

            // Validación de entrada
            if (!nombre || !prenda_id || !material_id || !adminId) {
                return res.status(400).json({ message: 'Nombre, prenda, material y token de administrador son obligatorios.' });
            }

            const disenoRepo = AppDataSource.getRepository(Diseno);

            // Verificamos que las entidades base existan
            const creador = await AppDataSource.manager.findOneBy(Administrador, { id: adminId });
            const prenda = await AppDataSource.manager.findOneBy(Prenda, { id: prenda_id });
            const material = await AppDataSource.manager.findOneBy(Material, { id: material_id });

            if (!creador || !prenda || !material) {
                return res.status(404).json({ message: 'Administrador, Prenda o Material no encontrado.' });
            }

            const nuevoDiseno = disenoRepo.create({
                nombre,
                creador,
                prenda,
                material,
            });

            const savedDiseno = await disenoRepo.save(nuevoDiseno);
            return res.status(201).json(savedDiseno);

        } catch (error: any) {
            // Este bloque catch se asegura de que siempre devolvamos un error JSON
            console.error("Error en DisenoController.create:", error); // Log para depuración en la terminal del backend
            return res.status(500).json({ message: 'Error interno al crear el diseño', error: error.message });
        }
    }

    // --- OBTENER TODOS LOS DISEÑOS (PARA CATÁLOGO PÚBLICO) ---
    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const disenoRepository = AppDataSource.getRepository(Diseno);
            const disenos = await disenoRepository.find({
                relations: ['creador', 'prenda', 'material'], // Incluimos los datos de las relaciones
            });
            return res.status(200).json(disenos);
        } catch (error: any) {
            console.error("Error en DisenoController.getAll:", error);
            return res.status(500).json({ message: 'Error al obtener los diseños.', error: error.message });
        }
    }

    // --- OBTENER LOS DISEÑOS CREADOS POR EL ADMINISTRADOR AUTENTICADO ---
    public async getByAdmin(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const adminId = req.user?.id;

            if (!adminId) {
                return res.status(400).json({ message: 'ID de administrador no encontrado en el token.' });
            }

            const disenoRepository = AppDataSource.getRepository(Diseno);
            const disenos = await disenoRepository.find({
                where: { creador: { id: adminId } },
                relations: ['prenda', 'material'],
            });
            return res.json(disenos);
        } catch (error: any) {
            console.error("Error en DisenoController.getByAdmin:", error);
            return res.status(500).json({ message: 'Error al obtener los diseños del administrador.', error: error.message });
        }
    }

    // --- ELIMINAR UN DISEÑO (SOLO EL CREADOR PUEDE HACERLO) ---
    public async delete(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const disenoId = parseInt(req.params.id);
            const adminId = req.user?.id;

            if (!disenoId || !adminId) {
                return res.status(400).json({ message: 'ID de diseño o de administrador no válido.' });
            }

            const disenoRepository = AppDataSource.getRepository(Diseno);
            const diseno = await disenoRepository.findOne({
                where: { id: disenoId },
                relations: ['creador'],
            });

            if (!diseno) {
                return res.status(404).json({ message: 'Diseño no encontrado.' });
            }

            // Verificación de propiedad: solo el dueño puede borrar
            if (diseno.creador.id !== adminId) {
                return res.status(403).json({ message: 'No tienes permiso para eliminar este diseño.' });
            }

            await disenoRepository.remove(diseno);
            return res.status(204).send(); // Sin contenido, éxito
        } catch (error: any) {
            console.error("Error en DisenoController.delete:", error);
            return res.status(500).json({ message: 'Error al eliminar el diseño.', error: error.message });
        }
    }
}

export default new DisenoController();
