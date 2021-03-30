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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSeeder = void 0;
const wgo_opengar_core_1 = require("@wisegar-org/wgo-opengar-core");
const _ = __importStar(require("lodash"));
const typedi_1 = require("typedi");
let DataSeeder = class DataSeeder {
    constructor() {
        this.init = async (conn) => {
            this.connection = conn;
            this.userRepository = this.connection.getRepository(wgo_opengar_core_1.UserEntity);
            this.roleRepository = this.connection.getRepository(wgo_opengar_core_1.RolEntity);
            this._userDataSerive = new wgo_opengar_core_1.UserDataService(conn);
            await this.createRolesSeeder();
            await this.createUserSeeder();
        };
    }
    /** TODO: PLEASE Store superuser schema on a json config file */
    async createUserSeeder() {
        const roleObj = await this.roleRepository.findOne({
            id: wgo_opengar_core_1.RolEntityEnum.superAdmin,
        });
        const rolesList = [roleObj];
        let admin = await this.userRepository.findOne({
            userName: "wisegar",
        });
        if (_.isEmpty(admin)) {
            let superAdmin = new wgo_opengar_core_1.UserEntity("Wisegar", "Admin", "wisegar", "info@wisegar.org", "Wisegar.0", rolesList, true);
            try {
                const userSeedResult = await this._userDataSerive.create(superAdmin, [
                    wgo_opengar_core_1.RolEntityEnum.superAdmin,
                ]);
            }
            catch (error) { }
        }
    }
    /** TODO: PLEASE Store roles schema on a json config file */
    async createRolesSeeder() {
        let roleObj = await this.roleRepository.findOne({
            id: wgo_opengar_core_1.RolEntityEnum.superAdmin,
        });
        if (_.isEmpty(roleObj)) {
            let userRole = new wgo_opengar_core_1.RolEntity("superAdmin", 1);
            await this.roleRepository.save(userRole);
        }
        roleObj = await this.roleRepository.findOne({
            id: wgo_opengar_core_1.RolEntityEnum.customer,
        });
        if (_.isEmpty(roleObj)) {
            let userRole = new wgo_opengar_core_1.RolEntity("customer", 2);
            await this.roleRepository.save(userRole);
        }
    }
};
DataSeeder = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], DataSeeder);
exports.DataSeeder = DataSeeder;
//# sourceMappingURL=Seeder.js.map