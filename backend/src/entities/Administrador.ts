// src/entities/Administrador.ts
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('administrador')
export class Administrador {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column({ name: 'nombre_usuario', unique: true })
    username!: string;

    @Column({ name: 'correo', unique: true })
    email!: string;

    @Column({ name: 'contrasena' })
    password!: string;

    @Column({ name: 'prendas_a_cargo', type: 'int', default: 0 })
    prendasACargo!: number;

    // Encriptar contraseña antes de guardar
    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    // Comparar contraseña para el login
    async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}