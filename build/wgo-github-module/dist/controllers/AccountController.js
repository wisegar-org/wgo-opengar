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
exports.AccountController = void 0;
var IssuesController_1 = require("./IssuesController");
var AccountEntity_1 = require("./../database/entities/AccountEntity");
var database_1 = require("../database");
var RepositoryController_1 = require("./RepositoryController");
var _1 = require(".");
var AccountController = /** @class */ (function () {
    function AccountController() {
        // debugger
        this.connection = database_1.GetConnection();
        this.accountConnection = this.connection.getRepository(AccountEntity_1.AccountEntity);
        this.collaboratorController = new _1.CollaboratorController();
        this.projectController = new _1.ProjectController();
        this.repositoryController = new RepositoryController_1.RepositoryController();
        this.issueController = new IssuesController_1.IssueController();
    }
    AccountController.prototype.Add = function (total_hours, contributorId, projectsIds, reposIds, issuesIds, pay_by_hours, pay_to_internet) {
        return __awaiter(this, void 0, void 0, function () {
            var token, collaborator, _a, projects, _b, repos, _c, issues, _d, total_issues, total_projects, total_repos, account, accountResult, _i, issues_1, issue, iss;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        token = process.env.API_TOKEN || '6516a804ca7a9f31a28f4d7818ace48a1ea092f7';
                        if (!contributorId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.collaboratorController.findCollaboratorById(contributorId)];
                    case 1:
                        _a = _e.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = undefined;
                        _e.label = 3;
                    case 3:
                        collaborator = _a;
                        if (!projectsIds) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.projectController.findProjectsById(projectsIds)];
                    case 4:
                        _b = _e.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _b = undefined;
                        _e.label = 6;
                    case 6:
                        projects = _b;
                        if (!reposIds) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.repositoryController.findRepositoriesById(reposIds)];
                    case 7:
                        _c = _e.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        _c = undefined;
                        _e.label = 9;
                    case 9:
                        repos = _c;
                        if (!issuesIds) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.issueController.findIssuesById(issuesIds)];
                    case 10:
                        _d = _e.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        _d = undefined;
                        _e.label = 12;
                    case 12:
                        issues = _d;
                        total_issues = issuesIds ? issuesIds.length : 0;
                        total_projects = projectsIds ? projectsIds.length : 0;
                        total_repos = reposIds ? reposIds.length : 0;
                        account = new AccountEntity_1.AccountEntity(total_hours, total_issues, total_projects, total_repos, pay_by_hours, pay_to_internet, collaborator, projects, repos);
                        return [4 /*yield*/, this.accountConnection.manager.save(account)];
                    case 13:
                        accountResult = _e.sent();
                        if (!issues) return [3 /*break*/, 18];
                        _i = 0, issues_1 = issues;
                        _e.label = 14;
                    case 14:
                        if (!(_i < issues_1.length)) return [3 /*break*/, 18];
                        issue = issues_1[_i];
                        return [4 /*yield*/, this.issueController.updateAccount(issue.id, accountResult.id, accountResult)];
                    case 15:
                        iss = _e.sent();
                        if (!iss) return [3 /*break*/, 17];
                        return [4 /*yield*/, this.issueController.setLabel(iss.owner, iss.repo, issue.id, 'TEST GITHUB', token)];
                    case 16:
                        _e.sent();
                        _e.label = 17;
                    case 17:
                        _i++;
                        return [3 /*break*/, 14];
                    case 18: return [4 /*yield*/, this.accountConnection.manager.save(accountResult)];
                    case 19: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    AccountController.prototype.getAllAccounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountConnection.find({
                            relations: ['contributor', 'projects', 'repos']
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return AccountController;
}());
exports.AccountController = AccountController;
