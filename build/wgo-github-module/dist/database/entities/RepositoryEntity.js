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
exports.RepositoryEntity = void 0;
var typeorm_1 = require("typeorm");
var AccountEntity_1 = require("./AccountEntity");
var IssueEntity_1 = require("./IssueEntity");
var RepositoryEntity = /** @class */ (function (_super) {
    __extends(RepositoryEntity, _super);
    function RepositoryEntity(numberId, title) {
        var _this = _super.call(this) || this;
        _this.id = numberId;
        _this.title = title;
        return _this;
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], RepositoryEntity.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], RepositoryEntity.prototype, "title", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return IssueEntity_1.IssueEntity; }, function (issue) { return issue.repositoryId; }),
        __metadata("design:type", Array)
    ], RepositoryEntity.prototype, "issues", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return AccountEntity_1.AccountEntity; }, function (repo) { return repo.repos; }),
        __metadata("design:type", Array)
    ], RepositoryEntity.prototype, "accounts", void 0);
    RepositoryEntity = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Number, String])
    ], RepositoryEntity);
    return RepositoryEntity;
}(typeorm_1.BaseEntity));
exports.RepositoryEntity = RepositoryEntity;
