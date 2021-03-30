import { static as expStatic, Express } from "express";
import { InitializeGithubRouter } from "../../../build/wgo-github-module/dist";
// import { InitializeAuthRouter } from "./AuthRouter";
// import { InitializeMediaRouter } from "./MediaRouter";
import { InitializeMiddlewares } from "../middlewares";

export function InitializeRouter(App: Express) {
  InitializeMiddlewares(App);
  // InitializeAuthRouter(App);
  // InitializeMediaRouter(App);

  App.use(expStatic(__dirname + "\\..\\..\\public"));

  InitializeGithubRouter(App);
}
