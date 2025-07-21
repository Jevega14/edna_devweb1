-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS edna_moda;

-- Usar la base de datos recién creada
USE edna_moda;

-- Tabla para los Administradores (Diseñadores)
CREATE TABLE Administrador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    nombre_usuario VARCHAR(100) NOT NULL UNIQUE,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    prendas_a_cargo INT DEFAULT 0
);

-- Tabla para los Usuarios (Clientes)
CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    nombre_usuario VARCHAR(100) NOT NULL UNIQUE,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(50)
);

-- Tabla para los Materiales del inventario
CREATE TABLE Material (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tela VARCHAR(100) NOT NULL,
    color VARCHAR(100) NOT NULL,
    costo DECIMAL(10, 2) NOT NULL,
    administrador_id INT,
    FOREIGN KEY (administrador_id) REFERENCES Administrador(id)
);

-- Tabla para las Prendas del inventario
CREATE TABLE Prenda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL,
    talla VARCHAR(10) NOT NULL,
    logo VARCHAR(255), -- Ruta a la imagen del logo
    imagen VARCHAR(255), -- Ruta a la imagen de la prenda
    costo   DECIMAL(10, 2) NOT NULL,
    administrador_id INT,
    FOREIGN KEY (administrador_id) REFERENCES Administrador(id)
);

-- Tabla para los Diseños creados por los usuarios
CREATE TABLE Diseño (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    usuario_id INT NOT NULL,
    prenda_id INT NOT NULL,
    material_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (prenda_id) REFERENCES Prenda(id),
    FOREIGN KEY (material_id) REFERENCES Material(id)
);

-- Tabla para los Pedidos realizados por los usuarios
CREATE TABLE Pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    precio DECIMAL(10, 2) NOT NULL,
    encargado_id INT NOT NULL,
    cliente_id INT NOT NULL,
    fecha_realizacion DATE NOT NULL,
    fecha_estimada_entrega DATE,
    direccion_entrega VARCHAR(255) NOT NULL,
    estado VARCHAR(50) DEFAULT 'Pendiente', -- Ej: Pendiente, Aceptado, En proceso, Entregado, Cancelado
    FOREIGN KEY (encargado_id) REFERENCES Administrador(id),
    FOREIGN KEY (cliente_id) REFERENCES Usuario(id)
);

-- Tabla de relación para los diseños en un pedido (Muchos a Muchos)
CREATE TABLE Pedido_Diseno (
    pedido_id INT,
    diseno_id INT,
    cantidad INT DEFAULT 1,
    PRIMARY KEY (pedido_id, diseno_id),
    FOREIGN KEY (pedido_id) REFERENCES Pedido(id),
    FOREIGN KEY (diseno_id) REFERENCES Diseño(id)
);

ALTER TABLE edna_moda.prenda
    ADD COLUMN talla VARCHAR(10) NULL,
    ADD COLUMN tipo_prenda VARCHAR(100) NOT NULL,
    ADD COLUMN colores JSON NULL,
    ADD COLUMN logo VARCHAR(255) NULL,
    ADD COLUMN imagen VARCHAR(255) NULL,
    ADD COLUMN costo DECIMAL(10,2)NULL;