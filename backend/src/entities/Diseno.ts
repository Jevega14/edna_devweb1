import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from './Usuario';
import { Prenda } from './Prenda';
import { Material } from './Material';
import { PedidoDiseno } from './PedidoDiseno';

@Entity()
export class Diseno {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ length: 100 })
  tipo_prenda!: string;

  // --- NUEVOS CAMPOS DEL FORMULARIO ---
  @Column()
  talla!: string;

  @Column({ type: 'json', nullable: true })
  colores?: string[]; // Se guardará como un array de strings en formato JSON

  @Column({ nullable: true })
  logo?: string; // URL de la imagen del logo

  @Column({ nullable: true })
  imagen?: string; // URL de la imagen

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

  @OneToMany(() => PedidoDiseno, pedidoDiseno => pedidoDiseno.diseno)
  pedidos_disenos!: PedidoDiseno[];
}
