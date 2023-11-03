import express from 'express';
import cors from 'cors';
import {PORT} from './config.js';
import {errorHandler} from './errorHandler.js';

import indexRoutes from './routes/index.routes.js'
import leaguesRoutes from './routes/leagues.routes.js'
import competitionsRoutes from './routes/competitions.routes.js'
import teamsRoutes from './routes/teams.routes.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(indexRoutes);
app.use(leaguesRoutes);
app.use(competitionsRoutes);
app.use(teamsRoutes);


app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    }
);
