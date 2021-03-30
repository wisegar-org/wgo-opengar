"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var OpticEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpticEntity = void 0;
const typeorm_1 = require("typeorm");
const mapping_json_1 = __importDefault(require("../mappings/mapping.json"));
let OpticEntity = OpticEntity_1 = class OpticEntity {
    toOpticEntity(obj) {
        const optic = new OpticEntity_1();
        Object.keys(mapping_json_1.default.OpticEntity.fields).forEach((property) => {
            optic[property] = obj[mapping_json_1.default.OpticEntity.fields[property]];
        });
        return optic;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], OpticEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], OpticEntity.prototype, "name", void 0);
OpticEntity = OpticEntity_1 = __decorate([
    typeorm_1.Entity({ name: "optics" })
], OpticEntity);
exports.OpticEntity = OpticEntity;
exports.default = OpticEntity;
//# sourceMappingURL=OpticEntity.js.map