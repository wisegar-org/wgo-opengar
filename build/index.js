"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const typedi_1 = __importDefault(require("typedi"));
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
typeorm_1.useContainer(typedi_1.default);
dotenv_1.default.config({
    path: ".env",
});
const port = process.env.SERVER_PORT || 3000;
const app = typedi_1.default.get(app_1.Application);
app.init(port);
//# sourceMappingURL=index.js.map