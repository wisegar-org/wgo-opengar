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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIssuesController = void 0;
var RepositoryController_1 = require("./RepositoryController");
var IssuesController_1 = require("./IssuesController");
var MilestoneController_1 = require("./MilestoneController");
var LabelController_1 = require("./LabelController");
var CollaboratorController_1 = require("./CollaboratorController");
var github_api_1 = __importDefault(require("github-api"));
var ProjectController_1 = require("./ProjectController");
var UpdateIssuesController = /** @class */ (function () {
    function UpdateIssuesController() {
    }
    UpdateIssuesController.prototype.Update = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var repoController, projController, colController, labelController, milestoneController, issueController, gh, data, me, repos, _loop_1, _i, _a, repo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        repoController = new RepositoryController_1.RepositoryController();
                        projController = new ProjectController_1.ProjectController();
                        colController = new CollaboratorController_1.CollaboratorController();
                        labelController = new LabelController_1.LabelController();
                        milestoneController = new MilestoneController_1.MilestoneController();
                        issueController = new IssuesController_1.IssueController();
                        gh = new github_api_1.default({
                            token: token
                        });
                        data = {};
                        me = gh.getUser();
                        return [4 /*yield*/, me.listRepos()];
                    case 1:
                        repos = _b.sent();
                        _loop_1 = function (repo) {
                            var repoId, repoA, projects, _c, _d, project, proj, issuesRepository;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0: return [4 /*yield*/, repoController.updateOrInsertRepository(repo.id, repo.name)];
                                    case 1:
                                        repoId = _e.sent();
                                        repoA = gh.getRepo(repo.owner.login, repo.name);
                                        return [4 /*yield*/, repoA.listProjects()];
                                    case 2:
                                        projects = _e.sent();
                                        _c = 0, _d = projects.data;
                                        _e.label = 3;
                                    case 3:
                                        if (!(_c < _d.length)) return [3 /*break*/, 6];
                                        project = _d[_c];
                                        return [4 /*yield*/, projController.updateOrInsertProject(project.id, project.name)];
                                    case 4:
                                        proj = _e.sent();
                                        _e.label = 5;
                                    case 5:
                                        _c++;
                                        return [3 /*break*/, 3];
                                    case 6:
                                        issuesRepository = gh.getIssues(repo.owner.login, repo.name);
                                        return [4 /*yield*/, issuesRepository.listIssues({ state: 'closed' }, function (_err, issue) {
                                                return __awaiter(this, void 0, void 0, function () {
                                                    var _loop_2, _i, issue_1, issueGithub;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!issue) return [3 /*break*/, 4];
                                                                _loop_2 = function (issueGithub) {
                                                                    var isAccounted, labels_ids, _b, _c, label, col, error_1, hours_1, last_comment_1, milestoneId, mil, error_2, collaboratorId_1, collaborator, coll_1, collaborator, col, error_3;
                                                                    return __generator(this, function (_d) {
                                                                        switch (_d.label) {
                                                                            case 0:
                                                                                isAccounted = false;
                                                                                labels_ids = [];
                                                                                _b = 0, _c = issueGithub.labels;
                                                                                _d.label = 1;
                                                                            case 1:
                                                                                if (!(_b < _c.length)) return [3 /*break*/, 6];
                                                                                label = _c[_b];
                                                                                if (label.name == 'Accounted') {
                                                                                    isAccounted = true;
                                                                                }
                                                                                else {
                                                                                    labels_ids.push(label.name);
                                                                                }
                                                                                _d.label = 2;
                                                                            case 2:
                                                                                _d.trys.push([2, 4, , 5]);
                                                                                return [4 /*yield*/, labelController.updateOrInsertLabel(label.id, label.name)];
                                                                            case 3:
                                                                                col = _d.sent();
                                                                                return [3 /*break*/, 5];
                                                                            case 4:
                                                                                error_1 = _d.sent();
                                                                                console.log('label error');
                                                                                console.log(label.id);
                                                                                console.log(label.name);
                                                                                return [3 /*break*/, 5];
                                                                            case 5:
                                                                                _b++;
                                                                                return [3 /*break*/, 1];
                                                                            case 6:
                                                                                if (!!isAccounted) return [3 /*break*/, 20];
                                                                                hours_1 = 0;
                                                                                last_comment_1 = '';
                                                                                if (!(issueGithub.comments > 0)) return [3 /*break*/, 8];
                                                                                return [4 /*yield*/, issuesRepository.listIssueComments(issueGithub.number, function (_err, comments) {
                                                                                        last_comment_1 = comments[comments.length - 1]
                                                                                            .body;
                                                                                        var matches = last_comment_1.match(/\d*.?\d*h/);
                                                                                        if ((matches === null || matches === void 0 ? void 0 : matches.length) == 1) {
                                                                                            hours_1 = parseFloat(last_comment_1);
                                                                                            if (isNaN(hours_1)) {
                                                                                                hours_1 = 0;
                                                                                            }
                                                                                        }
                                                                                    })];
                                                                            case 7:
                                                                                _d.sent();
                                                                                _d.label = 8;
                                                                            case 8:
                                                                                milestoneId = undefined;
                                                                                if (!issueGithub.milestone) return [3 /*break*/, 12];
                                                                                _d.label = 9;
                                                                            case 9:
                                                                                _d.trys.push([9, 11, , 12]);
                                                                                return [4 /*yield*/, milestoneController.updateOrInsertMilestone(issueGithub.milestone.id, issueGithub.milestone.title)];
                                                                            case 10:
                                                                                mil = _d.sent();
                                                                                milestoneId = issueGithub.milestone.title;
                                                                                return [3 /*break*/, 12];
                                                                            case 11:
                                                                                error_2 = _d.sent();
                                                                                console.log('milestone error');
                                                                                console.log(issueGithub.milestone.id);
                                                                                console.log(issueGithub.milestone.title);
                                                                                return [3 /*break*/, 12];
                                                                            case 12:
                                                                                collaboratorId_1 = undefined;
                                                                                if (!issueGithub.assignee) return [3 /*break*/, 14];
                                                                                collaborator = gh.getUser(issueGithub.assignee.login);
                                                                                return [4 /*yield*/, collaborator.getProfile(function (_err, user) {
                                                                                        return __awaiter(this, void 0, void 0, function () {
                                                                                            var col, error_4;
                                                                                            return __generator(this, function (_a) {
                                                                                                switch (_a.label) {
                                                                                                    case 0:
                                                                                                        _a.trys.push([0, 2, , 3]);
                                                                                                        return [4 /*yield*/, colController.updateOrInsertCollaborator(issueGithub.assignee.id, issueGithub.assignee.login, issueGithub.assignee.node_id, issueGithub.assignee.type, issueGithub.assignee.avatar_url, issueGithub.assignee.url, user.name || '', user.location || '', user.email || '', user.bio || '')];
                                                                                                    case 1:
                                                                                                        col = _a.sent();
                                                                                                        collaboratorId_1 = col.id;
                                                                                                        return [3 /*break*/, 3];
                                                                                                    case 2:
                                                                                                        error_4 = _a.sent();
                                                                                                        console.log('collaborator error');
                                                                                                        console.log(error_4);
                                                                                                        console.log(user);
                                                                                                        return [3 /*break*/, 3];
                                                                                                    case 3: return [2 /*return*/];
                                                                                                }
                                                                                            });
                                                                                        });
                                                                                    })];
                                                                            case 13:
                                                                                _d.sent();
                                                                                return [3 /*break*/, 16];
                                                                            case 14:
                                                                                if (!(issueGithub.assignees.length > 0)) return [3 /*break*/, 16];
                                                                                // TODO: Revisar que hacer cuando no tiene asignado a nadie pero si tiene varios colaboradores
                                                                                // Por el momento nos quedamos con el primero de ellos
                                                                                console.log(issueGithub);
                                                                                coll_1 = issueGithub.assignees[0];
                                                                                collaborator = gh.getUser(coll_1.login);
                                                                                return [4 /*yield*/, collaborator.getProfile(function (_err, user) {
                                                                                        return __awaiter(this, void 0, void 0, function () {
                                                                                            var col, error_5;
                                                                                            return __generator(this, function (_a) {
                                                                                                switch (_a.label) {
                                                                                                    case 0:
                                                                                                        _a.trys.push([0, 2, , 3]);
                                                                                                        return [4 /*yield*/, colController.updateOrInsertCollaborator(coll_1.id, coll_1.login, coll_1.node_id, coll_1.type, coll_1.avatar_url, coll_1.url, user.name || '', user.location || '', user.email || '', user.bio || '')];
                                                                                                    case 1:
                                                                                                        col = _a.sent();
                                                                                                        collaboratorId_1 = col.id;
                                                                                                        console.log(collaboratorId_1);
                                                                                                        return [3 /*break*/, 3];
                                                                                                    case 2:
                                                                                                        error_5 = _a.sent();
                                                                                                        console.log('collaborator error');
                                                                                                        console.log(error_5);
                                                                                                        console.log(user);
                                                                                                        return [3 /*break*/, 3];
                                                                                                    case 3: return [2 /*return*/];
                                                                                                }
                                                                                            });
                                                                                        });
                                                                                    })];
                                                                            case 15:
                                                                                _d.sent();
                                                                                _d.label = 16;
                                                                            case 16:
                                                                                if (!(collaboratorId_1 != undefined)) return [3 /*break*/, 20];
                                                                                _d.label = 17;
                                                                            case 17:
                                                                                _d.trys.push([17, 19, , 20]);
                                                                                return [4 /*yield*/, issueController.updateOrInsertIssue(issueGithub.id, repo.owner.login, repo.name, issueGithub.title, issueGithub.state, hours_1, last_comment_1, new Date(issueGithub.created_at), new Date(issueGithub.closed_at), new Date(issueGithub.updated_at), issueGithub.number, issueGithub.description, issueGithub.url, collaboratorId_1, undefined, //TODO Rikr2 Falta poner la relacion con el proyecto aqui
                                                                                    repoId.id, labels_ids, milestoneId)];
                                                                            case 18:
                                                                                col = _d.sent();
                                                                                return [3 /*break*/, 20];
                                                                            case 19:
                                                                                error_3 = _d.sent();
                                                                                console.log('==========error==========');
                                                                                console.log(issueGithub);
                                                                                console.log(hours_1);
                                                                                console.log(error_3);
                                                                                console.log('---------------------------');
                                                                                return [3 /*break*/, 20];
                                                                            case 20: return [2 /*return*/];
                                                                        }
                                                                    });
                                                                };
                                                                _i = 0, issue_1 = issue;
                                                                _a.label = 1;
                                                            case 1:
                                                                if (!(_i < issue_1.length)) return [3 /*break*/, 4];
                                                                issueGithub = issue_1[_i];
                                                                return [5 /*yield**/, _loop_2(issueGithub)];
                                                            case 2:
                                                                _a.sent();
                                                                _a.label = 3;
                                                            case 3:
                                                                _i++;
                                                                return [3 /*break*/, 1];
                                                            case 4: return [2 /*return*/];
                                                        }
                                                    });
                                                });
                                            })];
                                    case 7:
                                        _e.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, _a = repos.data;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        repo = _a[_i];
                        return [5 /*yield**/, _loop_1(repo)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UpdateIssuesController;
}());
exports.UpdateIssuesController = UpdateIssuesController;
