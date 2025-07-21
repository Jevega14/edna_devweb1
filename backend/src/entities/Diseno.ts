import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn
} from 'typeorm';
import { Usuario } from './Usuario';
import { Material } from './Material';

@Entity()
export class Diseno {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ length: 100 })
  tipo_prenda!: string;

  @Column()
  talla!: string;

  @Column('simple-array')
  colores!: string[];

  @Column('decimal')
  costo!: number;

  @ManyToOne(() => Material)
  @JoinColumn({ name: 'material_id' })
  material!: Material;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;
}
