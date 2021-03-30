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
var ClientEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientEntity = void 0;
const typeorm_1 = require("typeorm");
const BillEntity_1 = require("./BillEntity");
const mappingConfig = require("../mappings/mapping.json");
let ClientEntity = ClientEntity_1 = class ClientEntity {
    /**
     *
     */
    constructor(name, lastName, birthDate, sex, civilStatus) {
        this.name = name || "";
        this.lastName = lastName || "";
        this.birthDate = birthDate || new Date(); //TODO borrar el new Date poner null
        this.sex = sex || "M";
        this.civilStatus = civilStatus || "";
    }
    setPrincipalInfo(address, cap, city, mail, phone) {
        this.principalAddress = address;
        this.principalCap = cap;
        this.principalCity = city;
        this.principalMail = mail;
        this.principalPhone = phone;
    }
    setSecondaryInfo(address, cap, city, mail, phone) {
        this.secundaryAddress = address || "";
        this.secundaryCap = cap || "";
        this.secundaryCity = city || "";
        this.secundaryMail = mail || "";
        this.secundaryPhone = phone || "";
    }
    toClientEntity(obj) {
        const client = new ClientEntity_1();
        Object.keys(mappingConfig.ProductEntity.fields).forEach((property) => {
            client[property] = obj[mappingConfig.ProductEntity.fields[property]];
        });
        return client;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ClientEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ClientEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ClientEntity.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], ClientEntity.prototype, "birthDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ClientEntity.prototype, "sex", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ClientEntity.prototype, "civilStatus", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ClientEntity.prototype, "principalAddress", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ClientEntity.prototype, "principalCap", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ClientEntity.prototype, "principalCity", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ClientEntity.prototype, "principalMail", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ClientEntity.prototype, "principalPhone", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ClientEntity.prototype, "secundaryAddress", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ClientEntity.prototype, "secundaryCap", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ClientEntity.prototype, "secundaryCity", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ClientEntity.prototype, "secundaryMail", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ClientEntity.prototype, "secundaryPhone", void 0);
__decorate([
    typeorm_1.OneToMany(() => BillEntity_1.BillEntity, (bill) => bill.client),
    __metadata("design:type", Array)
], ClientEntity.prototype, "bills", void 0);
ClientEntity = ClientEntity_1 = __decorate([
    typeorm_1.Entity({ name: "clients" }),
    __metadata("design:paramtypes", [String, String, Date, String, String])
], ClientEntity);
exports.ClientEntity = ClientEntity;
exports.default = ClientEntity;
//# sourceMappingURL=ClientEntity.js.map