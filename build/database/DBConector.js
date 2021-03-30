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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var DBConector_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConector = exports.Repository = exports.Connection = void 0;
const typeorm_1 = require("typeorm");
var typeorm_2 = require("typeorm");
Object.defineProperty(exports, "Connection", { enumerable: true, get: function () { return typeorm_2.Connection; } });
Object.defineProperty(exports, "Repository", { enumerable: true, get: function () { return typeorm_2.Repository; } });
const lodash_1 = __importDefault(require("lodash"));
const typedi_1 = __importStar(require("typedi"));
const DBConnections_1 = require("./DBConnections");
let DBConector = DBConector_1 = class DBConector {
    /**
     * Get the typeorm connection options
     * @param connection OGConnection enum value
     * @returns If no params return development connection. Environment enum returns the corrispondent OGConnection.
     */
    static async GetConnectionOptions(connection) {
        switch (connection) {
            case DBConnections_1.OGConnection.Development: {
                return DBConnections_1.developmentConnection;
            }
            case DBConnections_1.OGConnection.Staging: {
                return DBConnections_1.stagingConnection;
            }
            case DBConnections_1.OGConnection.Production: {
                return DBConnections_1.productionConnection;
            }
            case DBConnections_1.OGConnection.Environment: {
                if (process.env.NODE_ENV === "development")
                    return DBConnections_1.developmentConnection;
                if (process.env.NODE_ENV === "staging")
                    return DBConnections_1.stagingConnection;
                if (process.env.NODE_ENV === "production")
                    return DBConnections_1.productionConnection;
                throw Error("No valid environment value was found on '.env' file. Impossible to determinate a connection options value to return.");
            }
            default: {
                return DBConnections_1.developmentConnection;
            }
        }
    }
    static async Connect(connectionType) {
        const connectionOptions = await DBConector_1.GetConnectionOptions(connectionType);
        let connection;
        try {
            if (!lodash_1.default.isUndefined(connectionOptions)) {
                console.log(`DBConector: trying to connect to ${connectionOptions.name} connection`);
                connection = await typeorm_1.createConnection(connectionOptions);
            }
            else {
                console.log("DBConector: Impossible to retrieve a valid connection options");
            }
        }
        catch (error) {
            console.log(`DBConector connect. Error: ${error.message}`);
        }
        if (connection)
            console.log(`DBConector: connection successfully stabilished`);
        typedi_1.default.set('connection', connection);
        return connection;
    }
};
DBConector = DBConector_1 = __decorate([
    typedi_1.Service()
], DBConector);
exports.DBConector = DBConector;
//# sourceMappingURL=DBConector.js.map