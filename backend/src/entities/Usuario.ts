// src/entities/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('usuario') // El nombre de la tabla es correcto
export class Usuario {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 }) // 'nombre' ya coincide
    nombre!: string;

    @Column({ name: 'nombre_usuario', length: 100, unique: true }) // Mapeo explícito
    username!: string;

    @Column({ name: 'correo', length: 100, unique: true }) // Mapeo explícito
    email!: string;

    @Column({ name: 'contrasena', length: 255 }) // Mapeo explícito
    password!: string;

    @Column({ length: 50, nullable: true }) // 'telefono' ya coincide
    telefono?: string;

    @Column({ type: 'varchar', length: 255, nullable: true }) // 'direccion' ya coincide
    direccion?: string;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}