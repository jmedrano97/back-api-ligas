Table ligas {
  id_liga integer [primary key, increment]
  nombre varchar(255) [not null]
  descripcion varchar(255) [not null]
  created_at timestamp [not null, default: `CURRENT_TIMESTAMP`]
}

Table torneos {
  id_torneo integer [primary key, increment]
  nombre varchar(255) [not null]
  id_liga integer
  created_at timestamp [not null, default: `CURRENT_TIMESTAMP`]

}

Table equipos {
  id_equipo integer [primary key, increment]
  nombre varchar(255) [not null]
  id_torneo integer
  created_at timestamp [not null, default: `CURRENT_TIMESTAMP`]


  // -- Otras columnas de información del equipo
}

Table competencias {
  id_competencia integer [primary key, increment]
  nombre varchar(255) [not null]
  id_torneo integer
  created_at timestamp [not null, default: `CURRENT_TIMESTAMP`]


  // -- Otras columnas de información del competencia
}

Table equiposCompetencia {
  id_equiposCompetencia integer [primary key,  increment]
  id_equipo integer
  id_competencia integer
  juegos_jugados integer
  juegos_ganados integer
  juegos_empatados integer
  juegos_perdidos integer
  created_at timestamp [not null, default: `CURRENT_TIMESTAMP`]

}

Ref: equiposCompetencia.id_equipo > equipos.id_equipo
Ref: equiposCompetencia.id_competencia > competencias.id_competencia
Ref: torneos.id_liga > ligas.id_liga
Ref: equipos.id_torneo > torneos.id_torneo
Ref: competencias.id_torneo > torneos.id_torneo