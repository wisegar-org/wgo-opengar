"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConnection = exports.InitializeConnection = void 0;
var path_1 = __importDefault(require("path"));
var typeorm_1 = require("typeorm");
// const databaseConfig = require('../../ormconfig.json')
var dbConn = process.env.DATABASE_CONNECTION || 'default';
var connection;
// debugger
var deployPath = path_1.default.parse(__dirname).dir;
var config = [path_1.default.join(deployPath, './database/entities/*.js')];
var connUrl = process.env.DATABASE_URL;
if (connUrl == undefined) {
    connUrl = 'postgres://zpzcjivqrnwrrr:d2b59769e642ad04e2cd5f3d29a6da9430989a241ae63305e84712c992e3198d@ec2-108-128-104-50.eu-west-1.compute.amazonaws.com:5432/d5ol14rgdbg8sd';
}
connUrl = connUrl.replace("postgres://", "");
var pgUserPass = connUrl.split("@")[0];
var pgHostPortDb = connUrl.split("@")[1];
var pgHostPort = pgHostPortDb.split("/")[0];
var pgDb = pgHostPortDb.split("/")[1];
var pgUser = pgUserPass.split(":")[0];
var pgPass = pgUserPass.split(":")[1];
var pgHost = pgHostPort.split(":")[0];
var pgPort = parseInt(pgHostPort.split(":")[1]);
var connectionConfig = {
    name: 'default',
    type: 'postgres',
    host: pgHost || 'localhost',
    port: pgPort || 5432,
    username: pgUser || 'github',
    password: pgPass || 'github',
    database: pgDb || 'github',
    entities: config,
    ssl: { rejectUnauthorized: false },
    logging: false,
    synchronize: true
};
var InitializeConnection = function (database) {
    if (database === void 0) { database = 0; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // debugger
                    console.log(__dirname);
                    console.log(__filename);
                    return [4 /*yield*/, typeorm_1.createConnection(connectionConfig)
                        // switch (database) {
                        //   case 0:
                        //     connection = await createConnection(databaseConfig[0])
                        //     break
                        //   case 1:
                        //     connection = await createConnection(databaseConfig[1])
                        //     break
                        //   default:
                        //     connection = await createConnection(databaseConfig[0])
                        //     break
                        // }
                    ];
                case 1:
                    connection = _a.sent();
                    // switch (database) {
                    //   case 0:
                    //     connection = await createConnection(databaseConfig[0])
                    //     break
                    //   case 1:
                    //     connection = await createConnection(databaseConfig[1])
                    //     break
                    //   default:
                    //     connection = await createConnection(databaseConfig[0])
                    //     break
                    // }
                    return [2 /*return*/, connection];
            }
        });
    });
};
exports.InitializeConnection = InitializeConnection;
var GetConnection = function () {
    return connection;
};
exports.GetConnection = GetConnection;
