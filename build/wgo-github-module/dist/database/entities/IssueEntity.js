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
exports.IssueEntity = void 0;
var typeorm_1 = require("typeorm");
var CollaboratorEntity_1 = require("./CollaboratorEntity");
var ProjectEntity_1 = require("./ProjectEntity");
var RepositoryEntity_1 = require("./RepositoryEntity");
var AccountEntity_1 = require("./AccountEntity");
var IssueEntity = /** @class */ (function (_super) {
    __extends(IssueEntity, _super);
    function IssueEntity(numberId, owner, repository_name, title, status, hours, created_at, closed_at, updated_at, number, description, url, last_comment, collaborator, project, repo, labels, milestones, account) {
        var _this = _super.call(this) || this;
        _this.id = numberId;
        _this.title = title;
        _this.status = status;
        _this.hours = hours || 0;
        _this.last_comment = last_comment;
        _this.created_at = created_at;
        _this.closed_at = closed_at;
        _this.updated_at = updated_at;
        _this.number = number;
        _this.owner = owner;
        _this.repo = repository_name;
        _this.description = description;
        _this.url = url;
        if (collaborator) {
            _this.assignedToId = collaborator.id;
            _this.assignedTo = collaborator;
        }
        if (project) {
            _this.projectId = project.id;
            _this.project = project;
        }
        if (repo) {
            _this.repositoryId = repo.id;
            _this.repository = repo;
        }
        if (account) {
            _this.accountId = account.id;
            _this.account = account;
        }
        _this.labels = labels ? labels.join(', ') : '';
        _this.milestones = milestones || '';
        return _this;
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], IssueEntity.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], IssueEntity.prototype, "owner", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], IssueEntity.prototype, "repo", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], IssueEntity.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], IssueEntity.prototype, "status", void 0);
    __decorate([
        typeorm_1.Column({ type: 'float' }),
        __metadata("design:type", Number)
    ], IssueEntity.prototype, "hours", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], IssueEntity.prototype, "labels", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], IssueEntity.prototype, "milestones", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], IssueEntity.prototype, "last_comment", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], IssueEntity.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], IssueEntity.prototype, "closed_at", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], IssueEntity.prototype, "updated_at", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], IssueEntity.prototype, "number", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], IssueEntity.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], IssueEntity.prototype, "url", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], IssueEntity.prototype, "assignedToId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return CollaboratorEntity_1.CollaboratorEntity; }, function (col) { return col.issues; }, { nullable: true }),
        __metadata("design:type", CollaboratorEntity_1.CollaboratorEntity)
    ], IssueEntity.prototype, "assignedTo", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], IssueEntity.prototype, "projectId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return ProjectEntity_1.ProjectEntity; }, function (proj) { return proj.issues; }, { nullable: true }),
        __metadata("design:type", ProjectEntity_1.ProjectEntity)
    ], IssueEntity.prototype, "project", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], IssueEntity.prototype, "repositoryId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return RepositoryEntity_1.RepositoryEntity; }, function (repo) { return repo.issues; }, { nullable: true }),
        __metadata("design:type", RepositoryEntity_1.RepositoryEntity)
    ], IssueEntity.prototype, "repository", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], IssueEntity.prototype, "accountId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return AccountEntity_1.AccountEntity; }, function (acc) { return acc.issues; }, { nullable: true }),
        __metadata("design:type", AccountEntity_1.AccountEntity)
    ], IssueEntity.prototype, "account", void 0);
    IssueEntity = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Number, String, String, String, String, Number, Date,
            Date,
            Date, Number, String, String, String, CollaboratorEntity_1.CollaboratorEntity,
            ProjectEntity_1.ProjectEntity,
            RepositoryEntity_1.RepositoryEntity, Array, String, AccountEntity_1.AccountEntity])
    ], IssueEntity);
    return IssueEntity;
}(typeorm_1.BaseEntity));
exports.IssueEntity = IssueEntity;
