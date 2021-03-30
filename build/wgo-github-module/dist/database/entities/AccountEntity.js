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
exports.AccountEntity = void 0;
var typeorm_1 = require("typeorm");
var RepositoryEntity_1 = require("./RepositoryEntity");
var ProjectEntity_1 = require("./ProjectEntity");
var CollaboratorEntity_1 = require("./CollaboratorEntity");
var IssueEntity_1 = require("./IssueEntity");
var AccountEntity = /** @class */ (function (_super) {
    __extends(AccountEntity, _super);
    function AccountEntity(total_hours, total_issues, total_projects, total_repos, pay_by_hours, pay_to_internet, contributor, projects, repos) {
        var _this = _super.call(this) || this;
        _this.date = new Date(Date.now());
        _this.total_hours = total_hours;
        _this.total_issues = total_issues;
        _this.total_projects = total_projects;
        _this.total_repos = total_repos;
        _this.pay_by_hours = pay_by_hours;
        _this.pay_to_internet = pay_to_internet;
        if (contributor) {
            _this.contributorId = contributor.id;
            _this.contributor = contributor;
        }
        if (projects) {
            _this.projects = projects;
        }
        if (repos) {
            _this.repos = repos;
        }
        return _this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], AccountEntity.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], AccountEntity.prototype, "date", void 0);
    __decorate([
        typeorm_1.Column({ type: 'float' }),
        __metadata("design:type", Number)
    ], AccountEntity.prototype, "total_hours", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], AccountEntity.prototype, "total_projects", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], AccountEntity.prototype, "total_issues", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], AccountEntity.prototype, "total_repos", void 0);
    __decorate([
        typeorm_1.Column({ type: 'float' }),
        __metadata("design:type", Number)
    ], AccountEntity.prototype, "pay_by_hours", void 0);
    __decorate([
        typeorm_1.Column({ type: 'float' }),
        __metadata("design:type", Number)
    ], AccountEntity.prototype, "pay_to_internet", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], AccountEntity.prototype, "contributorId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return CollaboratorEntity_1.CollaboratorEntity; }, function (coll) { return coll.accounts; }, {
            nullable: true
        }),
        __metadata("design:type", CollaboratorEntity_1.CollaboratorEntity)
    ], AccountEntity.prototype, "contributor", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return IssueEntity_1.IssueEntity; }, function (issue) { return issue.accountId; }, { cascade: true }),
        __metadata("design:type", Array)
    ], AccountEntity.prototype, "issues", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return ProjectEntity_1.ProjectEntity; }, function (project) { return project.accounts; }, {
            cascade: true
        }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], AccountEntity.prototype, "projects", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return RepositoryEntity_1.RepositoryEntity; }, function (repo) { return repo.accounts; }, {
            cascade: true
        }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], AccountEntity.prototype, "repos", void 0);
    AccountEntity = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Number, Number, Number, Number, Number, Number, Object, Object, Object])
    ], AccountEntity);
    return AccountEntity;
}(typeorm_1.BaseEntity));
exports.AccountEntity = AccountEntity;
