import { Router } from 'express';
import multer from 'multer';
import path from 'path';

const router = Router();

// Configuración de Multer para guardar los archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        // Creamos un nombre de archivo único para evitar colisiones
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Definimos el endpoint: POST /api/upload
// 'image' es el nombre del campo que el frontend debe usar
router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'Por favor, sube un archivo.' });
    }

    // Devolvemos la ruta de acceso al archivo guardado
    res.status(200).json({
        message: 'Archivo subido exitosamente',
        filePath: `/uploads/${req.file.filename}` // Ruta que se guardará en la BD
    });
});

export default router;