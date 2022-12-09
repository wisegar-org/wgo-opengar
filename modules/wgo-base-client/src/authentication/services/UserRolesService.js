import { __awaiter, __generator } from "tslib";
import { ApiService } from "../../core/services/ApiService";
import { M_USER_ROLES_DELETE_USER, Q_AUTH_GET_ALL_ROLES, Q_AUTH_GET_ALL_USER, Q_AUTH_GET_USER, } from "./UserRolesServiceQueries";
import { AUTH_PATH_DELETE_USER, AUTH_PATH_GET_ALL_ROLES, AUTH_PATH_GET_ALL_USERS, AUTH_PATH_GET_USER, } from "@wisegar-org/wgo-base-models/build/authentication/server";
var UserRolesService = /** @class */ (function () {
    function UserRolesService() {
        this.apiInstance = ApiService.GetInstance();
    }
    UserRolesService.prototype.getUser = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.query({
                                query: Q_AUTH_GET_USER,
                                fetchPolicy: "no-cache",
                                variables: {
                                    data: input,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[AUTH_PATH_GET_USER]];
                        }
                        return [2 /*return*/, undefined];
                    case 2:
                        error_1 = _a.sent();
                        console.log("UserRolesService getUser error: ", error_1);
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserRolesService.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.query({
                                query: Q_AUTH_GET_ALL_USER,
                                fetchPolicy: "no-cache",
                                variables: {},
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[AUTH_PATH_GET_ALL_USERS]];
                        }
                        return [2 /*return*/, []];
                    case 2:
                        error_2 = _a.sent();
                        console.log("UserRolesService getAllUsers error: ", error_2);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserRolesService.prototype.getAllRoles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.query({
                                query: Q_AUTH_GET_ALL_ROLES,
                                variables: {},
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[AUTH_PATH_GET_ALL_ROLES]];
                        }
                        return [2 /*return*/, []];
                    case 2:
                        error_3 = _a.sent();
                        console.log("UserRolesService getAllRoles error: ", error_3);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserRolesService.prototype.deleteUser = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.mutate({
                                mutation: M_USER_ROLES_DELETE_USER,
                                variables: {
                                    data: input,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[AUTH_PATH_DELETE_USER]];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_4 = _a.sent();
                        console.log("UserRolesService deleteUser error: ", error_4);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserRolesService;
}());
export { UserRolesService };
//# sourceMappingURL=UserRolesService.js.map