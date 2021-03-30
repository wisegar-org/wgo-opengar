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
exports.InitializeRouter = void 0;
var controllers_1 = require("../controllers");
var database_1 = require("../database");
var middlewares_1 = require("../middlewares");
var RepositoryController_1 = require("../controllers/RepositoryController");
var ExportPdfService_1 = require("../services/ExportPdfService");
var token = process.env.API_TOKEN || '6516a804ca7a9f31a28f4d7818ace48a1ea092f7';
var InitializeRouter = function (app) { return __awaiter(void 0, void 0, void 0, function () {
    var colController, projController, issuesController, labelController, milestoneController, updateIssuesController, repoController, accountController;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.InitializeConnection()];
            case 1:
                _a.sent();
                return [4 /*yield*/, middlewares_1.InitializeMiddlewares(app)];
            case 2:
                _a.sent();
                colController = new controllers_1.CollaboratorController();
                projController = new controllers_1.ProjectController();
                issuesController = new controllers_1.IssueController();
                labelController = new controllers_1.LabelController();
                milestoneController = new controllers_1.MilestoneController();
                updateIssuesController = new controllers_1.UpdateIssuesController();
                repoController = new RepositoryController_1.RepositoryController();
                accountController = new controllers_1.AccountController();
                app.get('/api/issues', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = {};
                                return [4 /*yield*/, issuesController.getAllIssues()];
                            case 1:
                                result = (_a.issues = _b.sent(), _a);
                                res.send(result);
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.get('/api/issues/account/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = {};
                                return [4 /*yield*/, issuesController.getIssuesFromAccount(parseInt(req.params.id))];
                            case 1:
                                result = (_a.issues = _b.sent(), _a);
                                res.send(result);
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.get('/api/milestones', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = {};
                                return [4 /*yield*/, milestoneController.getAllMilestones()];
                            case 1:
                                result = (_a.milestones = _b.sent(), _a);
                                res.send(result);
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.get('/api/labels', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = {};
                                return [4 /*yield*/, labelController.getAllLabels()];
                            case 1:
                                result = (_a.labels = _b.sent(), _a);
                                res.send(result);
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.get('/api/projects', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = {};
                                return [4 /*yield*/, projController.getAllProject()];
                            case 1:
                                result = (_a.projects = _b.sent(), _a);
                                res.send(result);
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.get('/api/repositories', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = {};
                                return [4 /*yield*/, repoController.getAllRepository()];
                            case 1:
                                result = (_a.repositories = _b.sent(), _a);
                                res.send(result);
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.get('/api/collaborators', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = {};
                                return [4 /*yield*/, colController.getAllCollaborators()];
                            case 1:
                                result = (_a.collaborators = _b.sent(), _a);
                                res.send(result);
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.get('/api/accounts', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = {};
                                return [4 /*yield*/, accountController.getAllAccounts()];
                            case 1:
                                result = (_a.accounts = _b.sent(), _a);
                                res.send(result);
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.get('/api/update', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, updateIssuesController.Update(token)];
                            case 1:
                                _a.sent();
                                res.send({ message: 'Updated!', update: true });
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.post('/api/addAccounting', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var params;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                params = req.body;
                                return [4 /*yield*/, accountController.Add(params.hours, params.collaboratorId, params.projectsId, params.reposId, params.issuesId, params.pay_by_hours, params.pay_to_internet)];
                            case 1:
                                _a.sent();
                                res.send({ message: 'Created!', created: true });
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.post('/api/collUpdateAccInfo', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, id, card_number, pay_by_hours, pay_to_internet, updated;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = req.body, id = _a.id, card_number = _a.card_number, pay_by_hours = _a.pay_by_hours, pay_to_internet = _a.pay_to_internet;
                                return [4 /*yield*/, colController.updateAccountingInfo(id, card_number, pay_by_hours, pay_to_internet)];
                            case 1:
                                updated = _b.sent();
                                res.send({ update: !!updated, collaborators: [updated] });
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.get('/api/exportPdf', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        ExportPdfService_1.createAccoutingPdf(function (doc) {
                            res.setHeader('Content-type', 'application/pdf');
                            doc.pipe(res);
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
exports.InitializeRouter = InitializeRouter;
