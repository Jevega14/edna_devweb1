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




