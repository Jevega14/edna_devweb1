// src/entities/PedidoDiseno.ts
import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Pedido } from './Pedido';
import { Diseno } from './Diseno';

@Entity('pedido_diseno')
export class PedidoDiseno {
    @PrimaryColumn()
    public pedido_id!: number;

    @PrimaryColumn()
    public diseno_id!: number;

    @Column({ default: 1 })
    cantidad!: number;

    @ManyToOne(() => Pedido, pedido => pedido.pedido_disenos)
    @JoinColumn({ name: 'pedido_id' })
    public pedido!: Pedido;

    @ManyToOne(() => Diseno, diseno => diseno.pedidos_disenos)
    @JoinColumn({ name: 'diseno_id' })
    public diseno!: Diseno;
}