import 'reflect-metadata'
import { useContainer } from "typeorm";
import Container from "typedi";
import { Application } from './app';
import dotenv from "dotenv";

useContainer(Container)

dotenv.config({
    path: ".env",
});

const port = process.env.SERVER_PORT || 3000;
const connectionName = process.env.DATABASE_CONNECTION

const app = new Application()
app.init(port, connectionName)