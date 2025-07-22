import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
// CAMBIO: Ya no importamos Usuario, ahora importamos Administrador
import { Administrador } from './Administrador';
import { Prenda } from './Prenda';
import { Material } from './Material';
import { PedidoDiseno } from './PedidoDiseno';

@Entity('diseño')
export class Diseno {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  // --- RELACIÓN CORREGIDA ---
  // Ahora un Diseño pertenece a un Administrador.
  // Usamos `JoinColumn` para decirle a TypeORM que la columna en la base de datos
  // se sigue llamando 'usuario_id', aunque lógicamente apunta a un administrador.
  @ManyToOne(() => Administrador)
  @JoinColumn({ name: 'usuario_id' })
  creador!: Administrador;

  @ManyToOne(() => Prenda)
  @JoinColumn({ name: 'prenda_id' })
  prenda!: Prenda;

  @ManyToOne(() => Material)
  @JoinColumn({ name: 'material_id' })
  material!: Material;

  @OneToMany(() => PedidoDiseno, (pedidoDiseno) => pedidoDiseno.diseno)
  public pedidos_disenos!: PedidoDiseno[];
}
