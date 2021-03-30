import "reflect-metadata";
import { useContainer } from "typeorm";
import Container from "typedi";
import { Application } from "./app";
import dotenv from "dotenv";

useContainer(Container);

dotenv.config({
  path: ".env",
});

const port = process.env.PORT || 3000;
const app = Container.get(Application);
app.init(port);
