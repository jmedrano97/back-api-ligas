import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: process.env.DB_HOST ,
    port: process.env.DB_PORT ,
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_DATABASE ,
});

// docker ps
// docker run -it --rm --link mymysql:mysql mysql:latest mysql -h mysql -u root -p
