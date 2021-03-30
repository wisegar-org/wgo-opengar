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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillEntity = void 0;
const typeorm_1 = require("typeorm");
const ClientEntity_1 = __importDefault(require("./ClientEntity"));
const ProductEntity_1 = __importDefault(require("./ProductEntity"));
let BillEntity = class BillEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BillEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BillEntity.prototype, "billNumber", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], BillEntity.prototype, "date", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillEntity.prototype, "lensDescription", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BillEntity.prototype, "lensPrice", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillEntity.prototype, "frameDescription", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BillEntity.prototype, "framePrice", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillEntity.prototype, "serviceDescription", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BillEntity.prototype, "servicePrice", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BillEntity.prototype, "offer", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BillEntity.prototype, "total", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BillEntity.prototype, "payment", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BillEntity.prototype, "balance", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillEntity.prototype, "observation", void 0);
__decorate([
    typeorm_1.ManyToOne(() => ClientEntity_1.default, (client) => client.id),
    __metadata("design:type", ClientEntity_1.default)
], BillEntity.prototype, "client", void 0);
__decorate([
    typeorm_1.OneToMany(() => ProductEntity_1.default, (product) => product.bill),
    __metadata("design:type", Array)
], BillEntity.prototype, "products", void 0);
BillEntity = __decorate([
    typeorm_1.Entity({ name: "bills" })
], BillEntity);
exports.BillEntity = BillEntity;
//# sourceMappingURL=BillEntity.js.map