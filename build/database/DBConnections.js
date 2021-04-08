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
    username: "github",
    password: "github",
    database: "github",
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
    host: "ec2-108-128-104-50.eu-west-1.compute.amazonaws.com",
    port: 5432,
    username: "zpzcjivqrnwrrr",
    password: "d2b59769e642ad04e2cd5f3d29a6da9430989a241ae63305e84712c992e3198d",
    database: "d5ol14rgdbg8sd",
    logging: false,
    synchronize: true,
    ssl: { rejectUnauthorized: false },
    entities: [wgo_opengar_core_1.UserEntity, wgo_opengar_core_1.MediaEntity, wgo_opengar_core_1.Session, wgo_opengar_core_1.RolEntity],
};
//# sourceMappingURL=DBConnections.js.map