import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import {errorHandler} from './errorHandler.js';
import morgan from 'morgan';

import indexRoutes from './routes/index.routes.js'
import leaguesRoutes from './routes/leagues.routes.js'
import competitionsRoutes from './routes/competitions.routes.js'
import teamsRoutes from './routes/teams.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(indexRoutes);
app.use(leaguesRoutes);
app.use(competitionsRoutes);
app.use(teamsRoutes);
app.use(authRoutes);


app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    }
);
