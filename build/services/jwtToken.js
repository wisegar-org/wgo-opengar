"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TOKEN_SECRET = "87`'9zMh3VCQzsE8";
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign(user, TOKEN_SECRET, { expiresIn: "1h" });
};
exports.generateAccessToken = generateAccessToken;
const verifyAccessToken = (res, token) => {
    try {
        console.log(token);
        const data = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
        const now = Math.trunc(new Date().getTime() / 1000);
        if (data.exp < now) {
            console.log('token is expired');
            return undefined;
        }
        console.log(data.exp - now, now, data.iat);
        if (data.exp - (30 * 60) < now) {
            let newData = {};
            newData.session = data.session;
            const newToken = exports.generateAccessToken(newData);
            res.header('Access-Control-Expose-Headers', 'refreshToken');
            res.header('refreshToken', newToken);
        }
        return Object.assign({}, data);
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
};
exports.verifyAccessToken = verifyAccessToken;
//# sourceMappingURL=jwtToken.js.map