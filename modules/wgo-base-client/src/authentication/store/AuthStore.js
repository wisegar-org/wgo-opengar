import { __awaiter, __generator } from "tslib";
import { SUPERADMIN, USER_AUTH_TOKEN, } from "@wisegar-org/wgo-base-models/build/authentication";
import { AuthService } from "../services/AuthService";
import { UserRolesService } from "../services/UserRolesService";
var AuthStore = /** @class */ (function () {
    /**
     *
     */
    function AuthStore() {
        this.token = localStorage.getItem(USER_AUTH_TOKEN) || "";
        this.user = {};
    }
    AuthStore.prototype.me = function () {
        return __awaiter(this, void 0, void 0, function () {
            var authService, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authService = new AuthService();
                        if (!this.token) return [3 /*break*/, 2];
                        return [4 /*yield*/, authService.me({ token: this.token || "" })];
                    case 1:
                        user = _a.sent();
                        if (!!user) {
                            this.user = user;
                            return [2 /*return*/, true];
                        }
                        else {
                            this.resetState();
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, false];
                }
            });
        });
    };
    AuthStore.prototype.setLogin = function (login) {
        this.user = login.user;
        this.token = login.token;
        localStorage.setItem(USER_AUTH_TOKEN, login.token);
    };
    AuthStore.prototype.setToken = function (token) {
        localStorage.setItem(USER_AUTH_TOKEN, token);
        this.token = token;
    };
    AuthStore.prototype.setUser = function (user) {
        this.user = user;
    };
    AuthStore.prototype.getAppToken = function () {
        return localStorage.getItem(USER_AUTH_TOKEN) || "";
    };
    AuthStore.prototype.isUserLogged = function () {
        return this.user && this.user.id;
    };
    AuthStore.prototype.isUserInRole = function (roles) {
        var _this = this;
        if (this.user && this.user.roles) {
            if (this.user.roles.indexOf(SUPERADMIN) !== -1)
                return true;
            var result = roles
                .map(function (role) { return _this.user.roles.indexOf(role) !== -1; })
                .reduce(function (a, b) { return a || b; }, false);
            return result;
        }
        return false;
    };
    AuthStore.prototype.resetState = function () {
        localStorage.clear();
        this.token = "";
        this.user = {};
    };
    AuthStore.prototype.setReset = function (reset) {
        this.resetState();
    };
    AuthStore.prototype.deleteUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var userRolesService, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRolesService = new UserRolesService();
                        return [4 /*yield*/, userRolesService.deleteUser(data)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AuthStore.prototype.loadAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userRolesService, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRolesService = new UserRolesService();
                        return [4 /*yield*/, userRolesService.getAllUsers()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    AuthStore.prototype.loadAllRoles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userRolesService, roles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRolesService = new UserRolesService();
                        return [4 /*yield*/, userRolesService.getAllRoles()];
                    case 1:
                        roles = _a.sent();
                        return [2 /*return*/, roles];
                }
            });
        });
    };
    return AuthStore;
}());
export { AuthStore };
//# sourceMappingURL=AuthStore.js.map