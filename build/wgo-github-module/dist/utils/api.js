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
exports.getUsers = exports.getProjects = exports.getLabels = exports.getMilestones = exports.getGitHubData = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
var github_api_1 = __importDefault(require("github-api"));
function getGitHubData(token) {
    return __awaiter(this, void 0, void 0, function () {
        var gh, data, me, repos, issues, _loop_1, _i, _a, repo;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    gh = new github_api_1.default({
                        token: token
                    });
                    data = {};
                    me = gh.getUser();
                    return [4 /*yield*/, me.listRepos()];
                case 1:
                    repos = _b.sent();
                    issues = [];
                    _loop_1 = function (repo) {
                        var issuesRepository;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    console.log(repo.name);
                                    issuesRepository = gh.getIssues(repo.owner.login, repo.name);
                                    return [4 /*yield*/, issuesRepository.listIssues({ state: 'closed' }, function (_err, issue) {
                                            return __awaiter(this, void 0, void 0, function () {
                                                var _loop_2, _i, issue_1, isu;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!issue) return [3 /*break*/, 4];
                                                            _loop_2 = function (isu) {
                                                                var isAccounted, labels, _b, labels_1, label, last_comment, hours_1;
                                                                return __generator(this, function (_c) {
                                                                    switch (_c.label) {
                                                                        case 0:
                                                                            isAccounted = false;
                                                                            labels = isu.labels;
                                                                            for (_b = 0, labels_1 = labels; _b < labels_1.length; _b++) {
                                                                                label = labels_1[_b];
                                                                                if (label.name == 'Accounted') {
                                                                                    isAccounted = true;
                                                                                    break;
                                                                                }
                                                                            }
                                                                            last_comment = '';
                                                                            if (!!isAccounted) return [3 /*break*/, 3];
                                                                            hours_1 = 0;
                                                                            if (!(isu.comments > 0)) return [3 /*break*/, 2];
                                                                            return [4 /*yield*/, issuesRepository.listIssueComments(isu.number, function (_err, comments) {
                                                                                    for (var comment in comments) {
                                                                                        last_comment = comments[comment].body;
                                                                                        if (last_comment.match(/\d*.?\d*h/)) {
                                                                                            hours_1 = parseFloat(last_comment);
                                                                                        }
                                                                                    }
                                                                                })];
                                                                        case 1:
                                                                            _c.sent();
                                                                            _c.label = 2;
                                                                        case 2:
                                                                            issues.push({
                                                                                number: isu.id,
                                                                                title: isu.title,
                                                                                assignedTo: isu.assignee,
                                                                                status: isu.state,
                                                                                labels: isu.labels,
                                                                                project: repo.name,
                                                                                milestones: isu.milestone,
                                                                                hours: hours_1,
                                                                                last_comment: last_comment
                                                                            });
                                                                            _c.label = 3;
                                                                        case 3: return [2 /*return*/];
                                                                    }
                                                                });
                                                            };
                                                            _i = 0, issue_1 = issue;
                                                            _a.label = 1;
                                                        case 1:
                                                            if (!(_i < issue_1.length)) return [3 /*break*/, 4];
                                                            isu = issue_1[_i];
                                                            return [5 /*yield**/, _loop_2(isu)];
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
                                case 1:
                                    _c.sent();
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
                case 5:
                    data.issues = issues;
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.getGitHubData = getGitHubData;
function getMilestones(token) {
    return __awaiter(this, void 0, void 0, function () {
        var gh, data, me, repos, miles, miles_ids, _i, _a, repo, issuesRepository;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    gh = new github_api_1.default({
                        token: token
                    });
                    data = {};
                    me = gh.getUser();
                    return [4 /*yield*/, me.listRepos()];
                case 1:
                    repos = _b.sent();
                    miles = [];
                    miles_ids = [];
                    _i = 0, _a = repos.data;
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    repo = _a[_i];
                    issuesRepository = gh.getIssues(repo.owner.login, repo.name);
                    return [4 /*yield*/, issuesRepository.listMilestones({}, function (_err, milestones) {
                            // Para mostrar las cerradas -> 'state': 'closed'
                            if (milestones) {
                                for (var _i = 0, milestones_1 = milestones; _i < milestones_1.length; _i++) {
                                    var milestone = milestones_1[_i];
                                    if (miles_ids.indexOf(milestone.title) < 0) {
                                        miles.push({
                                            id: milestone.id,
                                            title: milestone.title
                                        });
                                        miles_ids.push(milestone.title);
                                    }
                                }
                            }
                        })];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    data.milestones = miles;
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.getMilestones = getMilestones;
function getLabels(token) {
    return __awaiter(this, void 0, void 0, function () {
        var gh, data, me, repos, lbl, lbl_id, _i, _a, repo, issuesRepository;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    gh = new github_api_1.default({
                        token: token
                    });
                    data = {};
                    me = gh.getUser();
                    return [4 /*yield*/, me.listRepos()];
                case 1:
                    repos = _b.sent();
                    lbl = [];
                    lbl_id = [];
                    _i = 0, _a = repos.data;
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    repo = _a[_i];
                    issuesRepository = gh.getIssues(repo.owner.login, repo.name);
                    return [4 /*yield*/, issuesRepository.listLabels({}, function (_err, labels) {
                            // Para mostrar las cerradas -> 'state': 'closed'
                            if (labels) {
                                for (var _i = 0, labels_2 = labels; _i < labels_2.length; _i++) {
                                    var label = labels_2[_i];
                                    if (lbl_id.indexOf(label.name) < 0) {
                                        lbl.push({
                                            id: label.id,
                                            title: label.name
                                        });
                                        lbl_id.push(label.name);
                                    }
                                }
                            }
                        })];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    data.labels = lbl;
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.getLabels = getLabels;
function getProjects(token) {
    return __awaiter(this, void 0, void 0, function () {
        var gh, data, me, repos, repos_id, _i, _a, repo;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    gh = new github_api_1.default({
                        token: token
                    });
                    data = {};
                    me = gh.getUser();
                    return [4 /*yield*/, me.listRepos()];
                case 1:
                    repos = _b.sent();
                    repos_id = [];
                    for (_i = 0, _a = repos.data; _i < _a.length; _i++) {
                        repo = _a[_i];
                        repos_id.push({
                            id: repo.id,
                            title: repo.name
                        });
                    }
                    data.projects = repos_id;
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.getProjects = getProjects;
function getUsers(token) {
    return __awaiter(this, void 0, void 0, function () {
        var gh, data, me, repos, coll, coll_id, _i, _a, repo, rrr;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    gh = new github_api_1.default({
                        token: token
                    });
                    data = {};
                    me = gh.getUser();
                    return [4 /*yield*/, me.listRepos()];
                case 1:
                    repos = _b.sent();
                    coll = [];
                    coll_id = [];
                    _i = 0, _a = repos.data;
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    repo = _a[_i];
                    rrr = gh.getRepo(repo.owner.login, repo.name);
                    return [4 /*yield*/, rrr.getCollaborators(function (_err, collaborators) {
                            // Para mostrar las cerradas -> 'state': 'closed'
                            if (collaborators) {
                                for (var _i = 0, collaborators_1 = collaborators; _i < collaborators_1.length; _i++) {
                                    var collaborator = collaborators_1[_i];
                                    if (coll_id.indexOf(collaborator.id) < 0) {
                                        coll.push({
                                            id: collaborator.id,
                                            title: collaborator.login
                                        });
                                        coll_id.push(collaborator.id);
                                    }
                                }
                            }
                        })];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    data.collaborators = coll;
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.getUsers = getUsers;
// module.exports.getGitHubData = getGitHubData
