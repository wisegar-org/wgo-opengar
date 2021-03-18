export { Request, Response, Router, Application } from "express";
export const express = require("express");
export const App = express();
export const RouterApp = express.Router();

import { static as expStatic } from "express";
import { InitialiceRouter } from "wgo-github-module/dist";

const cors = require("cors");
App.use(cors());

const bodyParser = require("body-parser");
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));

var fileupload = require("express-fileupload");
App.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

App.use(expStatic(__dirname + "\\..\\..\\public"));
debugger;
InitialiceRouter(App);

export function registerRouterController(
  pathRouter: string,
  routerController: unknown
) {
  App.use(pathRouter, routerController);
}
