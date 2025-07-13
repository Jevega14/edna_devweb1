// src/entities/Pedido.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { Usuario } from './Usuario';
import { Administrador } from './Administrador';
import { PedidoDiseno } from './PedidoDiseno';

@Entity('pedido')
export class Pedido {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'precio', type: 'decimal', precision: 10, scale: 2 })
    precio!: number;

    @CreateDateColumn({ name: 'fecha_realizacion', type: 'date' })
    fechaRealizacion!: Date;

    @Column({ name: 'fecha_estimada_entrega', type: 'date' })
    fechaEstimadaEntrega!: Date;

    @Column({ name: 'direccion_entrega' })
    direccionEntrega!: string;

    @Column({ default: 'Pendiente' })
    estado!: string;

    // Relación con el Cliente (Usuario)
    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'cliente_id' })
    cliente!: Usuario;

    // Relación con el Encargado (Administrador/Diseñador)
    @ManyToOne(() => Administrador)
    @JoinColumn({ name: 'encargado_id' })
    encargado!: Administrador;

    // Relación con la tabla de unión PedidoDiseno
    @OneToMany(() => PedidoDiseno, (pedidoDiseno) => pedidoDiseno.pedido)
    public pedido_disenos!: PedidoDiseno[];
}