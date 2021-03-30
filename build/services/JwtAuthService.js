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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = exports.saveJwt = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const settings_1 = require("../settings");
const wgo_opengar_core_1 = require("@wisegar-org/wgo-opengar-core");
const _jwtService = new wgo_opengar_core_1.JwtService({ privateKey: settings_1.privateKey, publicKey: settings_1.publicKey });
const saveJwt = (jwtUser) => {
    const newToken = jwt.sign(jwtUser, settings_1.privateKey, {
        expiresIn: "7d",
        algorithm: 'RS256'
    });
    return newToken;
};
exports.saveJwt = saveJwt;
const checkJwt = (req, res) => {
    //Get the jwt token from the head
    const token = req.headers["auth-token"];
    if (!token)
        return undefined;
    //Try to validate the token and get data
    try {
        const result = _jwtService.verifyToken(token);
        const { username, session } = result;
        if (result.isExpiring) {
            const newToken = exports.saveJwt({ user: username, session });
            res.set("auth-token", newToken);
        }
        return { user: username, session };
    }
    catch (error) {
        return undefined;
    }
};
exports.checkJwt = checkJwt;
//# sourceMappingURL=JwtAuthService.js.map