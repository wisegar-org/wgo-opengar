import { Express } from 'express';

export function InitializeMiddlewares(App: Express) {
  const bodyParser = require('body-parser');
  App.use(bodyParser.json());
  App.use(bodyParser.urlencoded({ extended: true }));
}
