# EdnaModa - Desarrollo Web I

Una aplicación web para conectar diseñadores de moda con usuarios que buscan prendas personalizadas.

## 🚀 Cómo ejecutar la aplicación

### Prerrequisitos

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión 14 o superior)
- npm (viene incluido con Node.js)

### Instalación y ejecución

1. **Clonar o descargar el proyecto**
   ```bash
   cd c:\Users\jpvega\EDNADEVWEB\edna_devweb1
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar la aplicación en modo desarrollo**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   - La aplicación se abrirá automáticamente en `http://localhost:3000`
   - Si no se abre automáticamente, puedes acceder manualmente a esa URL

### Páginas disponibles

Una vez que la aplicación esté ejecutándose, puedes navegar a:

- `/login` - Página de inicio de sesión
- `/register` - Registro de nuevos usuarios (Usuario o Diseñador)
- `/usuario` - Dashboard principal del usuario
- `/diseñador` - Dashboard principal del diseñador
- `/perfil` - Editar perfil de usuario
- `/perfil-diseñador` - Editar perfil de diseñador (accesible desde el dashboard del diseñador)

### Comandos disponibles

- `npm start` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm run eject` - Expone la configuración de webpack (no recomendado)

## 📁 Estructura del proyecto

```
edna_devweb1/
├── public/                 # Archivos públicos (HTML base)
├── src/                    # Código fuente
│   ├── components/        # Componentes reutilizables
│   ├── pages/            # Páginas/vistas principales
│   ├── App.tsx           # Componente principal y rutas
│   └── index.js          # Punto de entrada
├── package.json          # Dependencias y scripts
├── tsconfig.json         # Configuración de TypeScript
└── README.md            # Este archivo
```

## 📋 Archivos importantes para subir

### Incluir en el repositorio:
- `src/` - Todo el código fuente
- `public/` - Archivos públicos
- `package.json` - Lista de dependencias
- `tsconfig.json` - Configuración TypeScript
- `README.md` - Documentación
- `.gitignore` - Archivos a excluir

### NO incluir (ya están en .gitignore):
- `node_modules/` - Dependencias instaladas
- `build/` - Archivos de producción
- `package-lock.json` - Archivo de bloqueo de versiones
- Archivos de configuración del IDE

## 🛠️ Tecnologías utilizadas

- React 19
- TypeScript
- React Router DOM
- CSS3

## 📝 Notas importantes

- Después de clonar el proyecto, siempre ejecuta `npm install` para instalar las dependencias
- Los archivos JSON que se generan automáticamente (como `package-lock.json`) no se suben al repositorio
- El archivo `.gitignore` se encarga de excluir automáticamente los archivos innecesarios

---

*Más documentación será agregada conforme se desarrollen nuevas funcionalidades.*




