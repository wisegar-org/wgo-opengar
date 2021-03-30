"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializeAuthRouter = void 0;
const AuthController_1 = require("../controllers/AuthController");
const typedi_1 = __importDefault(require("typedi"));
async function InitializeAuthRouter(App) {
    const authController = typedi_1.default.get(AuthController_1.AuthController);
    App.get("/auth", (req, res) => res.send("Auth Paths"));
    App.post("/auth/login", (req, res) => authController.loginUser(req, res));
    App.post("/auth/registerCustomer", (req, res) => authController.registerCustomer(req, res));
    App.post("/auth/updateCustomer", (req, res) => authController.updateCustomerProfile(req, res));
    App.post("/auth/checkPasswordStrength", (req, res) => authController.checkPasswordStrength(req, res));
    App.post("/auth/checkEmailConfirmation", (req, res) => authController.checkEmailConfirmation(req, res));
    App.post("/auth/resendEmailConfirmation", (req, res) => authController.resendEmailConfirmation(req, res));
}
exports.InitializeAuthRouter = InitializeAuthRouter;
//# sourceMappingURL=AuthRouter.js.map