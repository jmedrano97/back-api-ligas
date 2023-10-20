-- Definición de la tabla "ligas"
CREATE TABLE ligas (
    id_liga INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Definición de la tabla "torneos"
CREATE TABLE torneos (
    id_torneo INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(255) NOT NULL,
    id_liga INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_liga) REFERENCES ligas(id_liga)
);

-- Definición de la tabla "equipos"
CREATE TABLE equipos (
    id_equipo INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(255) NOT NULL,
    id_torneo INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Otras columnas de información del equipo
    FOREIGN KEY (id_torneo) REFERENCES torneos(id_torneo)
);

-- Definición de la tabla "competencias"
CREATE TABLE competencias (
    id_competencia INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(255) NOT NULL,
    id_torneo INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Otras columnas de información de la competencia
    FOREIGN KEY (id_torneo) REFERENCES torneos(id_torneo)
);

-- Definición de la tabla "equiposCompetencia"
CREATE TABLE equiposCompetencia (
    id_equiposCompetencia INTEGER PRIMARY KEY AUTOINCREMENT,
    id_equipo INTEGER,
    id_competencia INTEGER,
    juegos_jugados INTEGER,
    juegos_ganados INTEGER,
    juegos_empatados INTEGER,
    juegos_perdidos INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo),
    FOREIGN KEY (id_competencia) REFERENCES competencias(id_competencia)
);
