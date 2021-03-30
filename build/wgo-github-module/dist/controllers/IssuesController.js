"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueController = void 0;
var IssueEntity_1 = require("../database/entities/IssueEntity");
var CollaboratorController_1 = require("./CollaboratorController");
var ProjectController_1 = require("./ProjectController");
var database_1 = require("../database");
var RepositoryController_1 = require("./RepositoryController");
var IssueController = /** @class */ (function () {
    function IssueController() {
        this.connection = database_1.GetConnection();
        this.issueConnection = this.connection.getRepository(IssueEntity_1.IssueEntity);
        this.collaboratorController = new CollaboratorController_1.CollaboratorController();
        this.projectController = new ProjectController_1.ProjectController();
        this.repositoryController = new RepositoryController_1.RepositoryController();
    }
    IssueController.prototype.addIssue = function (numberId, owner, repository, title, status, hours, last_comment, created_at, closed_at, updated_at, number, description, url, collaboratorId, projectId, repositoryId, labels, milestones) {
        return __awaiter(this, void 0, void 0, function () {
            var result, collaborator, _a, project, _b, repo, _c, proj;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.issueConnection.findOne({
                            id: numberId
                        })];
                    case 1:
                        result = _d.sent();
                        if (result !== undefined) {
                            return [2 /*return*/, result];
                        }
                        if (!collaboratorId) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.collaboratorController.findCollaboratorById(collaboratorId)];
                    case 2:
                        _a = _d.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = undefined;
                        _d.label = 4;
                    case 4:
                        collaborator = _a;
                        if (!projectId) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.projectController.findProjectById(projectId)];
                    case 5:
                        _b = _d.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        _b = undefined;
                        _d.label = 7;
                    case 7:
                        project = _b;
                        if (!repositoryId) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.repositoryController.findRepositoryById(repositoryId)];
                    case 8:
                        _c = _d.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        _c = undefined;
                        _d.label = 10;
                    case 10:
                        repo = _c;
                        proj = new IssueEntity_1.IssueEntity(numberId, owner, repository, title, status, hours, created_at, closed_at, updated_at, number, description, url, last_comment, collaborator, project, repo, labels, milestones);
                        return [4 /*yield*/, this.issueConnection.manager.save(proj)];
                    case 11: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    IssueController.prototype.updateOrInsertIssue = function (numberId, owner, repository, title, status, hours, last_comment, created_at, closed_at, updated_at, number, description, url, collaboratorId, projectId, repositoryId, labels, milestones) {
        return __awaiter(this, void 0, void 0, function () {
            var issue, collaborator, _a, project, _b, repo, _c, proj;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.issueConnection.findOne({
                            id: numberId
                        })];
                    case 1:
                        issue = _d.sent();
                        if (!collaboratorId) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.collaboratorController.findCollaboratorById(collaboratorId)];
                    case 2:
                        _a = _d.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = undefined;
                        _d.label = 4;
                    case 4:
                        collaborator = _a;
                        if (!projectId) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.projectController.findProjectById(projectId)];
                    case 5:
                        _b = _d.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        _b = undefined;
                        _d.label = 7;
                    case 7:
                        project = _b;
                        if (!repositoryId) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.repositoryController.findRepositoryById(repositoryId)];
                    case 8:
                        _c = _d.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        _c = undefined;
                        _d.label = 10;
                    case 10:
                        repo = _c;
                        if (!(issue !== undefined)) return [3 /*break*/, 12];
                        issue.title = title || issue.title;
                        issue.status = status || issue.status;
                        issue.hours = hours || 0;
                        issue.assignedToId = collaborator ? collaborator.id : issue.assignedToId;
                        issue.projectId = project ? project.id : issue.projectId;
                        issue.labels = labels ? labels.join(', ') : issue.labels;
                        issue.milestones = milestones || issue.milestones;
                        issue.last_comment = last_comment || issue.last_comment;
                        issue.created_at = created_at || issue.created_at;
                        issue.closed_at = closed_at || issue.closed_at;
                        issue.updated_at = updated_at || issue.updated_at;
                        issue.number = number || issue.number;
                        issue.owner = owner || issue.owner;
                        issue.repo = repository || issue.repo;
                        issue.description = description || issue.description;
                        issue.url = url || issue.url;
                        if (collaborator) {
                            issue.assignedToId = collaborator.id;
                            issue.assignedTo = collaborator;
                        }
                        if (project) {
                            issue.projectId = project.id;
                            issue.project = project;
                        }
                        if (repo) {
                            issue.repositoryId = repo.id;
                            issue.repository = repo;
                        }
                        issue.accountId = issue.accountId;
                        issue.account = issue.account;
                        return [4 /*yield*/, issue.save()];
                    case 11: return [2 /*return*/, _d.sent()];
                    case 12:
                        proj = new IssueEntity_1.IssueEntity(numberId, owner, repository, title, status, hours, created_at, closed_at, updated_at, number, description, url, last_comment, collaborator, project, repo, labels, milestones);
                        return [4 /*yield*/, this.issueConnection.manager.save(proj)];
                    case 13: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    IssueController.prototype.updateAccount = function (id, accountId, account) {
        return __awaiter(this, void 0, void 0, function () {
            var issue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.issueConnection.findOne({
                            id: id
                        })];
                    case 1:
                        issue = _a.sent();
                        if (!(issue !== undefined)) return [3 /*break*/, 3];
                        issue.account = account;
                        issue.accountId = accountId;
                        return [4 /*yield*/, this.issueConnection.manager.save(issue)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    IssueController.prototype.setLabel = function (owner, repo, issueNumber, label, token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    IssueController.prototype.findIssueById = function (numberId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.issueConnection.findOne({
                            id: numberId
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IssueController.prototype.findIssuesById = function (issuesIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.issueConnection.findByIds(issuesIds)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IssueController.prototype.getAllIssues = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.issueConnection.find({
                            where: { accountId: null },
                            relations: ['assignedTo', 'project', 'repository', 'account']
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IssueController.prototype.getIssuesFromAccount = function (accountId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.issueConnection.find({
                            where: { accountId: accountId },
                            relations: ['assignedTo', 'project', 'repository', 'account']
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return IssueController;
}());
exports.IssueController = IssueController;
