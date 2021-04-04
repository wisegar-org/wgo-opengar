"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
const typeorm_1 = require("typeorm");
const wgo_opengar_core_1 = require("@wisegar-org/wgo-opengar-core");
const typedi_1 = require("typedi");
let RoleRepository = class RoleRepository extends typeorm_1.Repository {
};
RoleRepository = __decorate([
    typedi_1.Service(),
    typeorm_1.EntityRepository(wgo_opengar_core_1.RolEntity)
], RoleRepository);
exports.RoleRepository = RoleRepository;
//# sourceMappingURL=RoleRepository.js.map