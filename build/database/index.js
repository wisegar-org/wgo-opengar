"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = exports.RolEntity = exports.MediaEntity = exports.Repository = exports.Connection = void 0;
//export typeorm.ts methods
var DBConector_1 = require("./DBConector");
Object.defineProperty(exports, "Connection", { enumerable: true, get: function () { return DBConector_1.Connection; } });
Object.defineProperty(exports, "Repository", { enumerable: true, get: function () { return DBConector_1.Repository; } });
//export entities
var wgo_opengar_core_1 = require("@wisegar-org/wgo-opengar-core");
Object.defineProperty(exports, "MediaEntity", { enumerable: true, get: function () { return wgo_opengar_core_1.MediaEntity; } });
Object.defineProperty(exports, "RolEntity", { enumerable: true, get: function () { return wgo_opengar_core_1.RolEntity; } });
Object.defineProperty(exports, "UserEntity", { enumerable: true, get: function () { return wgo_opengar_core_1.UserEntity; } });
//# sourceMappingURL=index.js.map