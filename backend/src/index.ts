// src/index.ts (versión actualizada)
import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes'; //
import prendaRoutes from './routes/prendaRoutes';
import disenoRoutes from './routes/disenoRoutes';
import pedidoRoutes from './routes/pedidoRoutes';
import materialRoutes from './routes/materialRoutes';
import userRoutes from './routes/userRoutes';
import path from 'path'; // Importamos el módulo 'path' de Node.js
import uploadRoutes from './routes/uploadRoutes';

const main = async () => {
    // ... (código de conexión a la BD) ...
    try {
        await AppDataSource.initialize();
        console.log('✅ Conexión a la base de datos establecida.');
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
        return;
    }

    const app = express();
    const PORT = process.env.PORT || 4000;

    app.use(cors());
    app.use(express.json());

    // --- RUTAS DE LA API ---
    app.use('/api/upload', uploadRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/admins', adminRoutes);
    app.use('/api/prendas', prendaRoutes);
    app.use('/api/diseños', disenoRoutes);
    app.use('/api/pedidos', pedidoRoutes);
    app.use('/api/materiales', materialRoutes);
    app.use('/api/usuarios', userRoutes);
    app.use(cors());
    app.use(express.json());
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));



    app.listen(PORT, () => {
        console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
    });
};

main();