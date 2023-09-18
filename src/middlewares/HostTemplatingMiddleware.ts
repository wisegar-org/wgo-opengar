import express, { Express } from "express";
import { engine } from "express-handlebars";
import path from "path";

export const GetHandlebarStaticsKey = () => {
  if (process.env.APP_WEB_ROOT)
    return path.join(process.env.APP_WEB_ROOT, "public");

  throw "Impossible to get value from APP_WEB_ROOT environment key";
};
export const GetHandlebarRootKey = () => {
  if (process.env.APP_WEB_ROOT)
    return path.join(process.env.APP_WEB_ROOT, "views");

  throw "Impossible to get value from APP_WEB_ROOT environment key";
};

export const UseTemplatingMiddleware = (app: Express) => {
  app.engine("handlebars", engine());
  app.set("view engine", "handlebars");
  const viewPath = GetHandlebarRootKey();
  app.set("views", viewPath);

  app.use("/", express.static(GetHandlebarStaticsKey()));

  const elements = [
    {
      name: "Leche",
      age: 2,
    },
    {
      name: "Pan",
      age: 4,
    },
  ];
  app.get("/", (req, res) => {
    res.render("home", {
      title: "Express running",
      admin: true,
      elements: elements,
    });
  });
};
