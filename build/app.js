"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const graphql_1 = require("./servers/graphql");
const DBConector_1 = require("./database/DBConector");
const Seeder_1 = require("./content/Seeder");
const typedi_1 = __importStar(require("typedi"));
const express = require("express");
const router_1 = require("./rest/routes/router");
const wgo_opengar_core_1 = require("@wisegar-org/wgo-opengar-core");
require('@wisegar-org/wgo-opengar-core/dist/src/services/UserDataService');
let Application = class Application {
    async init(port) {
        try {
            const App = express();
            const connection = await DBConector_1.DBConector.Connect();
            if (!connection)
                throw Error(`Application init: Error trying to connect to the database`);
            typedi_1.default.set(wgo_opengar_core_1.UserDataService, wgo_opengar_core_1.UserDataService);
            await graphql_1.GraphQlServer.bootGraphql(App);
            const dataSeeder = typedi_1.default.get(Seeder_1.DataSeeder);
            await dataSeeder.init(connection);
            router_1.InitializeRouter(App);
            App.get("/", (req, res) => {
                res.send("API Rest");
            });
            App.listen(port, () => console.log(`> Listening on port ${port}`));
        }
        catch (error) {
            console.log(`Application init error: ${error.message}`);
            process.exit(1);
        }
    }
};
Application = __decorate([
    typedi_1.Service()
], Application);
exports.Application = Application;
//# sourceMappingURL=app.js.map