// src/controllers/PedidoController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Pedido } from '../entities/Pedido';
import { Diseno } from '../entities/Diseno';
import { Usuario } from '../entities/Usuario';
import { Administrador } from '../entities/Administrador';
import { PedidoDiseno } from '../entities/PedidoDiseno';
import { In } from 'typeorm';

// Interfaces para tipado del body (ya las teníamos)
interface PedidoDetalle {
    diseno_id: number;
    cantidad: number;
}
interface CreatePedidoBody {
    precio: number;
    fechaEstimadaEntrega: string;
    direccionEntrega: string;
    estado: string;
    cliente_id: number;
    encargado_id: number;
    detalles: PedidoDetalle[];
}

class PedidoController {
    // --- MÉTODO CREATE (ya lo teníamos, sin cambios) ---
    public async create(req: Request<{}, {}, CreatePedidoBody>, res: Response): Promise<Response> {
        const {
            precio,
            fechaEstimadaEntrega,
            direccionEntrega,
            estado,
            cliente_id,
            encargado_id,
            detalles,
        } = req.body;

        if (!precio || !cliente_id || !encargado_id || !detalles || !Array.isArray(detalles)) {
            return res.status(400).json({ message: 'Formato de petición inválido.' });
        }

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const cliente = await queryRunner.manager.findOneBy(Usuario, { id: cliente_id });
            const encargado = await queryRunner.manager.findOneBy(Administrador, { id: encargado_id });

            if (!cliente || !encargado) {
                throw new Error('El cliente o el encargado no existen.');
            }

            const disenoIds = detalles.map(d => d.diseno_id);
            const disenos = await queryRunner.manager.find(Diseno, { where: { id: In(disenoIds) } });

            if (disenos.length !== disenoIds.length) {
                throw new Error('Uno o más de los IDs de diseño no son válidos.');
            }

            const nuevoPedido = new Pedido();
            nuevoPedido.precio = precio;
            nuevoPedido.fechaEstimadaEntrega = new Date(fechaEstimadaEntrega);
            nuevoPedido.fechaRealizacion = new Date(); // ← esto llena el campo obligatorio
            nuevoPedido.direccionEntrega = direccionEntrega;
            nuevoPedido.estado = estado || 'Pendiente';
            nuevoPedido.cliente = cliente;
            nuevoPedido.encargado = encargado;

            const savedPedido = await queryRunner.manager.save(nuevoPedido);

            const detallesPedidoDiseno = detalles.map(detalle => {
                const pedidoDiseno = new PedidoDiseno();
                pedidoDiseno.pedido_id = savedPedido.id;
                pedidoDiseno.diseno_id = detalle.diseno_id;
                pedidoDiseno.cantidad = detalle.cantidad;
                return pedidoDiseno;
            });

            await queryRunner.manager.save(PedidoDiseno, detallesPedidoDiseno);

            await queryRunner.commitTransaction();
            return res.status(201).json({ message: 'Pedido creado exitosamente', pedidoId: savedPedido.id });

        } catch (error: any) {
            await queryRunner.rollbackTransaction();
            return res.status(500).json({ message: 'Error al crear el pedido', error: error.message });
        } finally {
            await queryRunner.release();
        }
    }

    // --- NUEVO: OBTENER TODOS LOS PEDIDOS ---
    public async getAll(req: Request, res: Response): Promise<Response> {
        const pedidoRepository = AppDataSource.getRepository(Pedido);
        try {
            const pedidos = await pedidoRepository.find({
                relations: [
                    'cliente',
                    'encargado',
                    'pedido_disenos',
                    'pedido_disenos.diseno' // Anidamos para traer los detalles del diseño
                ],
            });
            return res.json(pedidos);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error al obtener los pedidos', error: error.message });
        }
    }

    // --- NUEVO: OBTENER UN PEDIDO POR SU ID ---
    public async getById(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        const pedidoRepository = AppDataSource.getRepository(Pedido);
        try {
            const pedido = await pedidoRepository.findOne({
                where: { id },
                relations: ['cliente', 'encargado', 'pedido_disenos', 'pedido_disenos.diseno'],
            });
            if (!pedido) {
                return res.status(404).json({ message: 'Pedido no encontrado.' });
            }
            return res.json(pedido);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error al obtener el pedido', error: error.message });
        }
    }

    // --- NUEVO: ACTUALIZAR EL ESTADO DE UN PEDIDO ---
    public async updateStatus(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        const { estado } = req.body;

        if (!estado) {
            return res.status(400).json({ message: 'El campo "estado" es requerido.' });
        }

        const pedidoRepository = AppDataSource.getRepository(Pedido);
        try {
            const pedido = await pedidoRepository.findOneBy({ id });
            if (!pedido) {
                return res.status(404).json({ message: 'Pedido no encontrado.' });
            }
            pedido.estado = estado;
            const updatedPedido = await pedidoRepository.save(pedido);
            return res.json(updatedPedido);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error al actualizar el estado del pedido', error: error.message });
        }
    }
}

export default new PedidoController();
