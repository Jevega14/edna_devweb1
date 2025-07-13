// src/entities/Diseno.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from './Usuario';
import { Prenda } from './Prenda';
import { Material } from './Material';
import { PedidoDiseno } from './PedidoDiseno';

@Entity('diseño') // El nombre de la tabla en MySQL sigue siendo 'diseño'
export class Diseno {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    usuario!: Usuario;

    @ManyToOne(() => Prenda)
    @JoinColumn({ name: 'prenda_id' })
    prenda!: Prenda;

    @ManyToOne(() => Material)
    @JoinColumn({ name: 'material_id' })
    material!: Material;

    // --- RELACIÓN AÑADIDA ---
    // Esto conecta un Diseño con sus múltiples entradas en la tabla de unión.
    @OneToMany(() => PedidoDiseno, (pedidoDiseno) => pedidoDiseno.diseno)
    public pedidos_disenos!: PedidoDiseno[];
}