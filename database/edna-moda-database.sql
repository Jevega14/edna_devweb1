create table administrador
(
    id              int auto_increment
        primary key,
    nombre          varchar(255)  not null,
    nombre_usuario  varchar(100)  not null,
    correo          varchar(255)  not null,
    contrasena      varchar(255)  not null,
    prendas_a_cargo int default 0 null,
    constraint correo
        unique (correo),
    constraint nombre_usuario
        unique (nombre_usuario)
);

create table material
(
    id               int auto_increment
        primary key,
    tela             varchar(100)   not null,
    color            varchar(100)   not null,
    costo            decimal(10, 2) not null,
    administrador_id int            null,
    constraint material_ibfk_1
        foreign key (administrador_id) references administrador (id)
);

create index administrador_id
    on material (administrador_id);

create table prenda
(
    id               int auto_increment
        primary key,
    tipo             varchar(100)                not null,
    talla            varchar(10)                 not null,
    logo             text                        null,
    imagen           text                        null,
    administrador_id int                         null,
    precio           decimal(10, 2) default 0.00 not null,
    constraint prenda_ibfk_1
        foreign key (administrador_id) references administrador (id)
);

create index administrador_id
    on prenda (administrador_id);

create table usuario
(
    id             int auto_increment
        primary key,
    nombre         varchar(255) not null,
    nombre_usuario varchar(100) not null,
    correo         varchar(255) not null,
    contrasena     varchar(255) not null,
    direccion      varchar(255) null,
    telefono       varchar(50)  null,
    constraint correo
        unique (correo),
    constraint nombre_usuario
        unique (nombre_usuario)
);

create table diseño
(
    id          int auto_increment
        primary key,
    nombre      varchar(255) not null,
    usuario_id  int          not null,
    prenda_id   int          not null,
    material_id int          not null,
    constraint diseño_ibfk_1
        foreign key (usuario_id) references usuario (id),
    constraint diseño_ibfk_2
        foreign key (prenda_id) references prenda (id),
    constraint diseño_ibfk_3
        foreign key (material_id) references material (id)
);

create index material_id
    on diseño (material_id);

create index prenda_id
    on diseño (prenda_id);

create index usuario_id
    on diseño (usuario_id);

create table pedido
(
    id                     int auto_increment
        primary key,
    precio                 decimal(10, 2)                  not null,
    encargado_id           int                             not null,
    cliente_id             int                             not null,
    fecha_realizacion      date                            not null,
    fecha_estimada_entrega date                            null,
    direccion_entrega      varchar(255)                    not null,
    estado                 varchar(50) default 'Pendiente' null,
    constraint pedido_ibfk_1
        foreign key (encargado_id) references administrador (id),
    constraint pedido_ibfk_2
        foreign key (cliente_id) references usuario (id)
);

create index cliente_id
    on pedido (cliente_id);

create index encargado_id
    on pedido (encargado_id);

create table pedido_diseno
(
    pedido_id int           not null,
    diseno_id int           not null,
    cantidad  int default 1 null,
    primary key (pedido_id, diseno_id),
    constraint pedido_diseno_ibfk_1
        foreign key (pedido_id) references pedido (id),
    constraint pedido_diseno_ibfk_2
        foreign key (diseno_id) references diseño (id)
);

create index diseno_id
    on pedido_diseno (diseno_id);


