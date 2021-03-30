"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializeMiddlewares = void 0;
function InitializeMiddlewares(App) {
    var bodyParser = require('body-parser');
    App.use(bodyParser.json());
    App.use(bodyParser.urlencoded({ extended: true }));
}
exports.InitializeMiddlewares = InitializeMiddlewares;
