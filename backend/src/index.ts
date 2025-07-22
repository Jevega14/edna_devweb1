import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path'; // Importamos el módulo 'path' de Node.js
import { AppDataSource } from './config/data-source';

// Importación de todas las rutas
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import prendaRoutes from './routes/prendaRoutes';
import disenoRoutes from './routes/disenoRoutes';
import materialRoutes from './routes/materialRoutes';
import pedidoRoutes from './routes/pedidoRoutes';
import uploadRoutes from './routes/uploadRoutes';

const main = async () => {
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

    // Hacemos que la carpeta 'uploads' sea accesible públicamente
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    // --- REGISTRO DE RUTAS EN LA API ---
    app.use('/api/upload', uploadRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/admins', adminRoutes);
    app.use('/api/prendas', prendaRoutes);
    app.use('/api/disenos', disenoRoutes); // <-- ESTA LÍNEA ES LA CLAVE
    app.use('/api/materiales', materialRoutes);
    app.use('/api/pedidos', pedidoRoutes);

    app.listen(PORT, () => {
        console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
    });
};

main();