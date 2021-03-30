"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaEntityTypeEnum = exports.RolEntityEnum = exports.SaveImageResponse = exports.UserRegisterErrorResponse = exports.UserLoginErrorResponse = exports.UserLoginSuccessResponse = exports.ErrorRequest = exports.SuccessRequest = void 0;
// Export Response models
var BasicResponse_1 = require("./responseModels/BasicResponse");
Object.defineProperty(exports, "SuccessRequest", { enumerable: true, get: function () { return BasicResponse_1.SuccessResponse; } });
Object.defineProperty(exports, "ErrorRequest", { enumerable: true, get: function () { return BasicResponse_1.ErrorResponse; } });
var UserLoginResponse_1 = require("./responseModels/UserLoginResponse");
Object.defineProperty(exports, "UserLoginSuccessResponse", { enumerable: true, get: function () { return UserLoginResponse_1.UserLoginSuccessResponse; } });
Object.defineProperty(exports, "UserLoginErrorResponse", { enumerable: true, get: function () { return UserLoginResponse_1.UserLoginErrorResponse; } });
var UserRegisterResponse_1 = require("./responseModels/UserRegisterResponse");
Object.defineProperty(exports, "UserRegisterErrorResponse", { enumerable: true, get: function () { return UserRegisterResponse_1.UserRegisterErrorResponse; } });
var MediaResponse_1 = require("./responseModels/MediaResponse");
Object.defineProperty(exports, "SaveImageResponse", { enumerable: true, get: function () { return MediaResponse_1.SaveImageResponse; } });
// Export Enums models
var wgo_opengar_core_1 = require("@wisegar-org/wgo-opengar-core");
Object.defineProperty(exports, "RolEntityEnum", { enumerable: true, get: function () { return wgo_opengar_core_1.RolEntityEnum; } });
Object.defineProperty(exports, "MediaEntityTypeEnum", { enumerable: true, get: function () { return wgo_opengar_core_1.MediaEntityTypeEnum; } });
//# sourceMappingURL=index.js.map