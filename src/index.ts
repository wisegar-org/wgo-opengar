import "reflect-metadata";
import { Application } from "./app";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const port = process.env.SERVER_PORT || 3000;
const app = new Application();
app.init(port);
