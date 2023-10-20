import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "loco123",
    database: "miligadb",
});

// docker ps
// docker run -it --rm --link nombre_del_contenedor:mysql mysql:latest mysql -h mysql -u root -p
