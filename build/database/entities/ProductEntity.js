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
var ProductEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
const typeorm_1 = require("typeorm");
const BillEntity_1 = require("./BillEntity");
const mappingConfig = require("../mappings/mapping.json");
let ProductEntity = ProductEntity_1 = class ProductEntity {
    toProductEntity(obj) {
        const product = new ProductEntity_1();
        Object.keys(mappingConfig.ProductEntity.fields).forEach((property) => {
            product[property] = obj[mappingConfig.ProductEntity.fields[property]];
        });
        return product;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProductEntity.prototype, "code", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProductEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProductEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProductEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProductEntity.prototype, "treatment", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "ratio", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "diameter", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "caliber", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProductEntity.prototype, "color", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], ProductEntity.prototype, "purchaseDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], ProductEntity.prototype, "saleDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProductEntity.prototype, "provider", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProductEntity.prototype, "productStatus", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProductEntity.prototype, "brand", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProductEntity.prototype, "salesMargin", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProductEntity.prototype, "model", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProductEntity.prototype, "material", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "purchasePrice", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "salePrice", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProductEntity.prototype, "owner", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProductEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.ManyToOne(() => BillEntity_1.BillEntity, (bill) => bill.id),
    __metadata("design:type", BillEntity_1.BillEntity)
], ProductEntity.prototype, "bill", void 0);
ProductEntity = ProductEntity_1 = __decorate([
    typeorm_1.Entity({ name: "products" })
], ProductEntity);
exports.ProductEntity = ProductEntity;
exports.default = ProductEntity;
//# sourceMappingURL=ProductEntity.js.map