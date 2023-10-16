import express from 'express';
import cors from 'cors';
import {PORT} from './config.js';
import {errorHandler} from './errorHandler.js';

import indexRoutes from './routes/index.routes.js'
import ligasRoutes from './routes/ligas.routes.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(indexRoutes);
app.use(ligasRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    }
);
