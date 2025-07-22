import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Administrador } from './Administrador';

@Entity('prenda')
export class Prenda {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    tipo!: string;

    @Column()
    talla!: string;

    @Column({ type: 'text', nullable: true })
    logo?: string;

    @Column({ type: 'text', nullable: true })
    imagen?: string;

    // --- CAMPO AÑADIDO ---
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    precio!: number;

    @ManyToOne(() => Administrador)
    @JoinColumn({ name: 'administrador_id' })
    admin!: Administrador;
}
