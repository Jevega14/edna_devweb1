// src/entities/Prenda.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Administrador } from './Administrador'; // Importamos la entidad Administrador

@Entity('prenda')
export class Prenda {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    tipo!: string;

    @Column()
    talla!: string;

    @Column({ nullable: true }) // Puede que una prenda no tenga logo
    logo?: string;

    @Column({ nullable: true }) // Puede que una prenda no tenga imagen inicialmente
    imagen?: string;

    // --- MANEJO DE LA RELACIÓN ---
    // Esto crea una relación donde Muchas Prendas pertenecen a Un Administrador.
    @ManyToOne(() => Administrador)
    // Esto le dice a TypeORM que la columna de la llave foránea en la tabla 'prenda' se llama 'administrador_id'.
    @JoinColumn({ name: 'administrador_id' })
    admin!: Administrador;
}