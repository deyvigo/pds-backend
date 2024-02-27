create database railway;

use railway;

create table ciclo
(
    id_ciclo int auto_increment
        primary key,
    ciclo    varchar(20) not null,
    inicio   date        not null,
    fin      date        not null
);

create table rol
(
    id_rol int auto_increment
        primary key,
    rol    varchar(20) null
);

create table administrador
(
    id_administrador int auto_increment
        primary key,
    nombres          varchar(40)  not null,
    apellidos        varchar(40)  not null,
    username         varchar(40)  not null,
    password         varchar(100) not null,
    ad_rol           int          not null,
    constraint ad_rol
        foreign key (ad_rol) references rol (id_rol)
);

create table alumno
(
    id_alumno int auto_increment
        primary key,
    nombres   varchar(40)  not null,
    apellidos varchar(40)  not null,
    username  varchar(40)  not null,
    password  varchar(100) not null,
    nivel     int          not null,
    al_rol    int          not null,
    constraint alumno_rol_id_rol_fk
        foreign key (al_rol) references rol (id_rol)
);

create table curso
(
    id_curso         int auto_increment
        primary key,
    codigo_curso     varchar(10) not null,
    nombre           varchar(40) not null,
    nivel            int         not null,
    id_requisito     int         null,
    id_creador_curso int         not null,
    constraint curso_curso_id_curso_fk
        foreign key (id_requisito) references curso (id_curso),
    constraint id_creador_curso
        foreign key (id_creador_curso) references administrador (id_administrador)
);

create table profesor
(
    id_profesor    int auto_increment
        primary key,
    nombres        varchar(40)  not null,
    apellidos      varchar(40)  not null,
    username       varchar(40)  not null,
    password       varchar(100) not null,
    estado         varchar(15)  not null,
    id_autorizante int          null,
    pr_rol         int          not null,
    constraint id_autorizante
        foreign key (id_autorizante) references administrador (id_administrador),
    constraint profesor_rol_id_rol_fk
        foreign key (pr_rol) references rol (id_rol)
);

create table horario
(
    id_horario        int auto_increment
        primary key,
    dia_semana        varchar(15) not null,
    estado            varchar(15) not null,
    hora_inicio       time        not null,
    hora_final        time        not null,
    ciclo_id          int         not null,
    id_profesor_cargo int         not null,
    id_curso          int         not null,
    constraint horario_ciclo_id_ciclo_fk
        foreign key (ciclo_id) references ciclo (id_ciclo),
    constraint id_curso
        foreign key (id_curso) references curso (id_curso),
    constraint id_profesor_cargo
        foreign key (id_profesor_cargo) references profesor (id_profesor)
);

create table alumno_horario
(
    id_alumno_horario int auto_increment
        primary key,
    id_alumn          int not null,
    id_horario        int not null,
    constraint alumn_horario_fk
        foreign key (id_alumn) references alumno (id_alumno),
    constraint id_hora
        foreign key (id_horario) references horario (id_horario)
);

create table asistencia
(
    id_asistencia int auto_increment
        primary key,
    id_alumno     int        not null,
    id_horario    int        not null,
    asistencia    varchar(1) null,
    fecha         date       not null,
    constraint asistencia_alumno
        foreign key (id_alumno) references alumno (id_alumno),
    constraint asistencia_horario
        foreign key (id_horario) references horario (id_horario)
);

create table tema
(
    id_tema            int auto_increment
        primary key,
    nombre             varchar(40) not null,
    descripcion        text        not null,
    id_curso_pertenece int         not null,
    constraint id_curso_pertenece
        foreign key (id_curso_pertenece) references curso (id_curso)
);

create table ficha_nota
(
    id_ficha_nota    int auto_increment
        primary key,
    nota_final       int null,
    nota_eva_oral    int null,
    nota_eva_escrita int null,
    id_tema          int not null,
    id_ciclo         int not null,
    id_alumno        int not null,
    profesor_id      int not null,
    constraint ficha_nota_ciclo_id_ciclo_fk
        foreign key (id_ciclo) references ciclo (id_ciclo),
    constraint ficha_nota_profesor_id_profesor_fk
        foreign key (profesor_id) references profesor (id_profesor),
    constraint id_alumno
        foreign key (id_alumno) references alumno (id_alumno),
    constraint id_tema
        foreign key (id_tema) references tema (id_tema)
);

create table nota_exposicion
(
    id_nota_exposicion int auto_increment
        primary key,
    puntos_tiempo      int null,
    puntos_hab_comu    int null,
    puntos_estructura  int null,
    puntos_contenido   int null,
    id_ficha_nota      int null,
    constraint id_ficha_nota
        foreign key (id_ficha_nota) references ficha_nota (id_ficha_nota)
);

