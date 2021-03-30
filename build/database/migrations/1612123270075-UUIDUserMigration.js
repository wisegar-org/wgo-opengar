"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUIDUserMigration1612123270075 = void 0;
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
let UUIDUserMigration1612123270075 = class UUIDUserMigration1612123270075 {
    async up(queryRunner) {
        await queryRunner.addColumn("users", new typeorm_1.TableColumn({
            name: "uuid",
            type: "string",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("users", "uuid");
    }
};
UUIDUserMigration1612123270075 = __decorate([
    typedi_1.Service()
], UUIDUserMigration1612123270075);
exports.UUIDUserMigration1612123270075 = UUIDUserMigration1612123270075;
//# sourceMappingURL=1612123270075-UUIDUserMigration.js.map