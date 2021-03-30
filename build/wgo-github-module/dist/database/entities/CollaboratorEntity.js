"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.CollaboratorEntity = void 0;
var AccountEntity_1 = require("./AccountEntity");
var typeorm_1 = require("typeorm");
var IssueEntity_1 = require("./IssueEntity");
var CollaboratorEntity = /** @class */ (function (_super) {
    __extends(CollaboratorEntity, _super);
    function CollaboratorEntity(numberId, login, node_id, type, avatar_url, url, name, location, email, bio, card_number, pay_by_hours, pay_to_internet) {
        var _this = _super.call(this) || this;
        _this.id = numberId;
        _this.login = login;
        _this.node_id = node_id;
        _this.type = type;
        _this.avatar_url = avatar_url;
        _this.url = url;
        _this.name = name;
        _this.location = location;
        _this.email = email;
        _this.bio = bio;
        _this.card_number = card_number;
        _this.pay_by_hours = pay_by_hours;
        _this.pay_to_internet = pay_to_internet;
        return _this;
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], CollaboratorEntity.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], CollaboratorEntity.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], CollaboratorEntity.prototype, "login", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], CollaboratorEntity.prototype, "node_id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], CollaboratorEntity.prototype, "type", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], CollaboratorEntity.prototype, "avatar_url", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], CollaboratorEntity.prototype, "url", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], CollaboratorEntity.prototype, "location", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], CollaboratorEntity.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], CollaboratorEntity.prototype, "bio", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], CollaboratorEntity.prototype, "card_number", void 0);
    __decorate([
        typeorm_1.Column({ type: 'float', nullable: true }),
        __metadata("design:type", Number)
    ], CollaboratorEntity.prototype, "pay_by_hours", void 0);
    __decorate([
        typeorm_1.Column({ type: 'float', nullable: true }),
        __metadata("design:type", Number)
    ], CollaboratorEntity.prototype, "pay_to_internet", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return IssueEntity_1.IssueEntity; }, function (issue) { return issue.assignedToId; }),
        __metadata("design:type", Array)
    ], CollaboratorEntity.prototype, "issues", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return AccountEntity_1.AccountEntity; }, function (acc) { return acc.contributorId; }),
        __metadata("design:type", Array)
    ], CollaboratorEntity.prototype, "accounts", void 0);
    CollaboratorEntity = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Number, String, String, String, String, String, String, String, String, String, String, Number, Number])
    ], CollaboratorEntity);
    return CollaboratorEntity;
}(typeorm_1.BaseEntity));
exports.CollaboratorEntity = CollaboratorEntity;
