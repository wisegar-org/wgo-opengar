import { Express } from 'express'

export function InitializeMiddlewares(App: Express) {
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
}