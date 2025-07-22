import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from './Usuario';
import { Prenda } from './Prenda';
import { Material } from './Material';
import { PedidoDiseno } from './PedidoDiseno';

@Entity('diseño') // El nombre de la tabla en MySQL
export class Diseno {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  // Un diseño es creado por un usuario (administrador)
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  // Un diseño está compuesto por UNA prenda
  @ManyToOne(() => Prenda)
  @JoinColumn({ name: 'prenda_id' })
  prenda!: Prenda;

  // y UN material
  @ManyToOne(() => Material)
  @JoinColumn({ name: 'material_id' })
  material!: Material;

  // Relación con la tabla de unión (para futuros pedidos)
  @OneToMany(() => PedidoDiseno, (pedidoDiseno) => pedidoDiseno.diseno)
  public pedidos_disenos!: PedidoDiseno[];
}
