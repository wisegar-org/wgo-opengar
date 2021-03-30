"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializeMiddlewares = void 0;
function InitializeMiddlewares(App) {
    const cors = require("cors");
    App.use(cors());
    const bodyParser = require("body-parser");
    App.use(bodyParser.json());
    App.use(bodyParser.urlencoded({ extended: true }));
    var fileupload = require("express-fileupload");
    App.use(fileupload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    }));
}
exports.InitializeMiddlewares = InitializeMiddlewares;
//# sourceMappingURL=index.js.map