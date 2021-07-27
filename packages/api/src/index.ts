import * as http from 'http';
import path from 'path';

import * as bodyparser from 'body-parser';
import express from 'express';

import AuthRoutes from './auth/routes';
import { CommonRoutesConfig } from './common/routes';
import MongooseService from './database';
import UsersRoutes from './users/routes';

require('dotenv').config({
  path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
});

MongooseService.getInstance();

const app: express.Application = express();

const routes: any = [];

app.use(bodyparser.json({ limit: '5mb' }));

routes.push(new UsersRoutes(app));
routes.push(new AuthRoutes(app));

const server: http.Server = http.createServer(app);
const port = process.env.PORT || 3000;

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(`Server running at port ${port}`);
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    console.log(`Routes configured for ${route.getName()}`);
  });
});

export default app;
