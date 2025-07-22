# EdnaModa - Desarrollo Web I

Una aplicación web para conectar a tu tía Edna con usuarios que buscan prendas personalizadas.

## 🚀 Cómo ejecutar la aplicación

### Prerrequisitos

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión 14 o superior)
- npm (viene incluido con Node.js)

### Instalación y ejecución

1. **Clonar o descargar el proyecto**
   ```bash
   Tener directorio para descargar el proyecto 
   git clone https://github.com/Jevega14/edna_devweb1.git
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
- `/Gestionar mis diseños` - Eliminar,crear y modificar diseños guardados (accesible desde el dashboard del usuario)
- `/Carrito de compras` - Ver pedidos a ordenar (accesible desde el dashboard del usuario)
- `/Mis pedidos` - Detalles de pedidos ya realizados (accesible desde el dashboard del usuario)
- `/perfil-diseñador` - Editar perfil de diseñador (accesible desde el dashboard del diseñador)
- `/Gestionar inventario` - Editar, crear y eliminar prendas del diseñador y materiales (accesible desde el dashboard del diseñador)
- `/Añadir material` - Crear nuevo material para las prendas  (accesible desde el dashboard del diseñador)
- `/Crear nuevo diseño` - Crear desde 0 diseño para el catálogo  (accesible desde el dashboard del diseñador)
- `/Mis pedidos` - Detalles de pedidos realizados al diseñador (accesible desde el dashboard del diseñador)

## 📁 Estructura del proyecto

```
edna_devweb1/
├── backend/                # Servidor y API
│   ├── src/
│   │   ├── config/        # Configuración de la base de datos y controladores
│   │   ├── controllers/   # Controladores de la API
│   │   ├── entities/      # Entidades/Modelos de la base de datos
│   │   ├── middleware/    # Middleware de autenticación y autorización
│   │   ├── routes/        # Rutas de la API
│   │   ├── types/        # Tipos personalizados
│   │   └── index.ts      # Punto de entrada del servidor
│   ├── package.json      # Dependencias del backend
│   └── tsconfig.json     # Configuración de TypeScript para el backend
├── public/               # Archivos públicos (HTML base)
├── src/                  # Código fuente del frontend
│   ├── components/      # Componentes reutilizables
│   ├── icons/          # Iconos y assets
│   ├── pages/          # Páginas/vistas principales
│   │   └── styles/    # Estilos CSS de las páginas
│   ├── App.tsx         # Componente principal y rutas
│   └── index.js        # Punto de entrada del frontend
├── ednamoda.sql        # Script de la base de datos
├── package.json        # Dependencias del frontend
├── tsconfig.json       # Configuración de TypeScript para el frontend
└── README.md          # Este archivo
```

## 🛠️ Tecnologías utilizadas

- React 19
- TypeScript
- React Router DOM
- CSS3

## 📝 Notas importantes

- Después de clonar el proyecto, siempre ejecuta `npm install` para instalar las dependencias
- Los archivos JSON que se generan automáticamente (como `package-lock.json`) no se suben al repositorio
- El archivo `.gitignore` se encarga de excluir automáticamente los archivos innecesarios
- Algunas de las funcionalidades como crear nuevo material o gestionar inventario son puramente visuales y sólo funcionan dentro de la pestaña, pues aún no se ha enlazado una base de datos de soporte

## 🗄️ Configuración del Backend y Base de Datos

### Requisitos previos
- MySQL (versión 8.0 o superior)
- Node.js (versión 14 o superior)

### Configuración de la Base de Datos

1. **Crear la base de datos**
   - Abre MySQL Workbench o tu cliente SQL preferido
   - Ejecuta el script `ednamoda.sql` que se encuentra en la raíz del proyecto

2. **Configurar las variables de entorno**
   - En la carpeta `backend`, crea un archivo `.env` con la siguiente información:
     ```
     DB_HOST=localhost
     DB_PORT=3306
     DB_USER=tu_usuario
     DB_PASSWORD=tu_contraseña
     DB_DATABASE=ednamoda
     
     PORT=4000
     ```

### Ejecutar el Backend

1. **Instalar dependencias del backend**
   ```bash
   cd backend
   npm install
   ```

2. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```
   El servidor se iniciará en `http://localhost:4000`

### Problemas comunes
- Si hay un error de conexión a la base de datos, verifica que:
  - El servicio MySQL esté ejecutándose
  - Las credenciales en el archivo `.env` sean correctas
  - El puerto 3306 esté disponible




