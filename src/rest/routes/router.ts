import { static as expStatic, Express } from "express";
import { InitializeGithubRouter } from "wgo-github-module/dist";
import { InitializeAuthRouter } from './AuthRouter'
import { InitializeMediaRouter } from './MediaRouter';

export function InitializeRouter(App: Express) {
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

  InitializeAuthRouter(App)
  InitializeMediaRouter(App)

  App.use(expStatic(__dirname + "\\..\\..\\public"));
  debugger;
  InitializeGithubRouter(App);
}


