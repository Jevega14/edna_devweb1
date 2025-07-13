// src/entities/Material.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Administrador } from './Administrador';

@Entity('material')
export class Material {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    tela!: string;

    @Column()
    color!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    costo!: number;

    // Relación: Muchos materiales pueden ser registrados por un administrador.
    @ManyToOne(() => Administrador)
    @JoinColumn({ name: 'administrador_id' }) // El nombre de la columna en la BD
    admin!: Administrador;
}