"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializeRouter = void 0;
const express_1 = require("express");
const dist_1 = require("@wisegar-org/wgo-github/dist");
// import { InitializeAuthRouter } from "./AuthRouter";
// import { InitializeMediaRouter } from "./MediaRouter";
const middlewares_1 = require("../middlewares");
function InitializeRouter(App) {
    middlewares_1.InitializeMiddlewares(App);
    // InitializeAuthRouter(App);
    // InitializeMediaRouter(App);
    App.use(express_1.static(__dirname + "\\..\\..\\public"));
    dist_1.InitializeGithubRouter(App);
}
exports.InitializeRouter = InitializeRouter;
//# sourceMappingURL=router.js.map