"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productionConnection = exports.stagingConnection = exports.developmentConnection = exports.OGConnection = void 0;
const wgo_opengar_core_1 = require("@wisegar-org/wgo-opengar-core");
var OGConnection;
(function (OGConnection) {
    OGConnection[OGConnection["Development"] = 0] = "Development";
    OGConnection[OGConnection["Staging"] = 1] = "Staging";
    OGConnection[OGConnection["Production"] = 2] = "Production";
    OGConnection[OGConnection["Environment"] = 3] = "Environment";
})(OGConnection = exports.OGConnection || (exports.OGConnection = {}));
exports.developmentConnection = {
    name: "development",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "opengar",
    password: "opengar",
    database: "opengar-dev",
    logging: false,
    synchronize: true,
    entities: [wgo_opengar_core_1.UserEntity, wgo_opengar_core_1.MediaEntity, wgo_opengar_core_1.Session, wgo_opengar_core_1.RolEntity],
};
exports.stagingConnection = {
    name: "staging",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "opengar",
    password: "opengar",
    database: "opengar-stg",
    logging: false,
    synchronize: true,
    entities: [wgo_opengar_core_1.UserEntity, wgo_opengar_core_1.MediaEntity, wgo_opengar_core_1.Session, wgo_opengar_core_1.RolEntity],
};
exports.productionConnection = {
    name: "staging",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "opengar",
    password: "opengar",
    database: "opengar",
    logging: false,
    synchronize: true,
    entities: [wgo_opengar_core_1.UserEntity, wgo_opengar_core_1.MediaEntity, wgo_opengar_core_1.Session, wgo_opengar_core_1.RolEntity],
};
//# sourceMappingURL=DBConnections.js.map