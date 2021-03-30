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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseEntity = void 0;
const typeorm_1 = require("typeorm");
let LicenseEntity = class LicenseEntity {
    /**
     *
     */
    constructor(text, status, hour, date) {
        this.text = text;
        this.status = status;
        this.hour = hour;
        this.date = date;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], LicenseEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], LicenseEntity.prototype, "text", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], LicenseEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], LicenseEntity.prototype, "hour", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], LicenseEntity.prototype, "date", void 0);
LicenseEntity = __decorate([
    typeorm_1.Entity({ name: "license" }),
    __metadata("design:paramtypes", [String, String, Date, Date])
], LicenseEntity);
exports.LicenseEntity = LicenseEntity;
exports.default = LicenseEntity;
//# sourceMappingURL=LicenseEntity.js.map