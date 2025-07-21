import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from './Usuario';
import { Prenda } from './Prenda';
import { Material } from './Material';
import { PedidoDiseno } from './PedidoDiseno';

@Entity('diseño')
export class Diseno {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    // --- NUEVOS CAMPOS DEL FORMULARIO ---
    @Column({ type: 'varchar', length: 10, nullable: true })
    talla?: string;

    @Column({ type: 'json', nullable: true })
    colores?: string[]; // Se guardará como un array de strings en formato JSON

    @Column({ nullable: true })
    logo?: string; // Por ahora, guardaremos la URL de la imagen

    @Column({ nullable: true })
    imagen?: string; // Por ahora, guardaremos la URL de la imagen

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    costo?: number;

    // --- RELACIONES EXISTENTES ---
    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    usuario!: Usuario;

    @ManyToOne(() => Prenda)
    @JoinColumn({ name: 'prenda_id' })
    prenda!: Prenda;

    @ManyToOne(() => Material)
    @JoinColumn({ name: 'material_id' })
    material!: Material;

    @OneToMany(() => PedidoDiseno, (pedidoDiseno) => pedidoDiseno.diseno)
    public pedidos_disenos!: PedidoDiseno[];
}
