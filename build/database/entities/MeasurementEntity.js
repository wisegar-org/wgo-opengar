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
var MeasurementEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementEntity = void 0;
const typeorm_1 = require("typeorm");
const ClientEntity_1 = require("./ClientEntity");
const OpticEntity_1 = require("./OpticEntity");
const mapping_json_1 = __importDefault(require("../mappings/mapping.json"));
let MeasurementEntity = MeasurementEntity_1 = class MeasurementEntity {
    toMeasurementEntity(obj) {
        const measurment = new MeasurementEntity_1();
        Object.keys(mapping_json_1.default.MeasurementEntity.fields).forEach((property) => {
            measurment[property] =
                obj[mapping_json_1.default.MeasurementEntity.fields[property]];
        });
        return measurment;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "SPH_Lontano_d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "SPH_Lontano_s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "CYL_Lontano_d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "CYL_Lontano_s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "AXE_Lontano_d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "AXE_Lontano_s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "ADD_Lontano_d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "ADD_Lontano_s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "Prisma_Lontano_d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "Prisma_Lontano_s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "DPL_Lontano_d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "DPL_Lontano_s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "DPV_Lontano_d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "DPV_Lontano_s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "H_Lontano_d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "H_Lontano_s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "SPH_Vicino_d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "SPH_Vicino_s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "CYL_Vicino_d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "CYL_Vicino_s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "AXE_Vicino_d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "AXE_Vicino_s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "ADD_Vicino_d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "ADD_Vicino_s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "Prisma_Vicino_d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "Prisma_Vicino_s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "DPL_Vicino_d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "DPL_Vicino_s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "DPV_Vicino_d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "DPV_Vicino_s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "H_Vicino_d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasurementEntity.prototype, "H_Vicino_s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], MeasurementEntity.prototype, "data", void 0);
__decorate([
    typeorm_1.ManyToOne(() => ClientEntity_1.ClientEntity, (client) => client.id),
    __metadata("design:type", ClientEntity_1.ClientEntity)
], MeasurementEntity.prototype, "bills", void 0);
__decorate([
    typeorm_1.ManyToOne(() => OpticEntity_1.OpticEntity, (optic) => optic.id),
    __metadata("design:type", OpticEntity_1.OpticEntity)
], MeasurementEntity.prototype, "optic", void 0);
MeasurementEntity = MeasurementEntity_1 = __decorate([
    typeorm_1.Entity({ name: "measurments" })
], MeasurementEntity);
exports.MeasurementEntity = MeasurementEntity;
exports.default = MeasurementEntity;
//# sourceMappingURL=MeasurementEntity.js.map