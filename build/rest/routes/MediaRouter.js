"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializeMediaRouter = void 0;
const MediaController_1 = require("../controllers/MediaController");
const typedi_1 = __importDefault(require("typedi"));
function InitializeMediaRouter(App) {
    const mediaController = typedi_1.default.get(MediaController_1.MediaController);
    App.get("/media", (req, res) => res.send("Media Paths"));
    App.post("/media/saveImage", (req, res) => mediaController.saveImage(req, res));
}
exports.InitializeMediaRouter = InitializeMediaRouter;
//# sourceMappingURL=MediaRouter.js.map