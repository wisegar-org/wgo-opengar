import { __awaiter, __generator } from "tslib";
import { ApiService } from "../../core/services/ApiService";
import { M_AUTH_CHANGE_PASSWORD, M_AUTH_CONFIRM_REGISTER, M_AUTH_EDIT_USER, M_AUTH_LOGIN, M_AUTH_REGISTER, M_AUTH_RESEND_CONFIRM, M_AUTH_RESET_PASSWORD, Q_AUTH_ME, Q_AUTH_VALID_USER_NAME, } from "./AuthServiceQueries";
import { AUTH_PATH_CHANGE_RESET_PASSWORD, AUTH_PATH_CHECK_USER_NAME, AUTH_PATH_CONFIRM_REGIST, AUTH_PATH_EDIT_USER, AUTH_PATH_LOGIN, AUTH_PATH_ME, AUTH_PATH_REGISTER, AUTH_PATH_RESEND_CONFIRMATION, AUTH_PATH_RESET_PASSWORD, } from "@wisegar-org/wgo-base-models/build/authentication/server";
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.apiInstance = ApiService.GetInstance();
    }
    AuthService.prototype.loginUser = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.mutate({
                                mutation: M_AUTH_LOGIN,
                                variables: {
                                    data: input,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[AUTH_PATH_LOGIN]];
                        }
                        return [2 /*return*/, undefined];
                    case 2:
                        error_1 = _a.sent();
                        console.log("AuthService loginUser error: ", error_1);
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.me = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.query({
                                query: Q_AUTH_ME,
                                variables: {
                                    data: input,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[AUTH_PATH_ME]];
                        }
                        return [2 /*return*/, undefined];
                    case 2:
                        error_2 = _a.sent();
                        console.log("AuthService me error: ", error_2);
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.validUserName = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.query({
                                query: Q_AUTH_VALID_USER_NAME,
                                variables: {
                                    data: input,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[AUTH_PATH_CHECK_USER_NAME]];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_3 = _a.sent();
                        console.log("AuthService validUserName error: ", error_3);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.registerUser = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.mutate({
                                mutation: M_AUTH_REGISTER,
                                variables: {
                                    data: input,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[AUTH_PATH_REGISTER]];
                        }
                        return [2 /*return*/, undefined];
                    case 2:
                        error_4 = _a.sent();
                        console.log("AuthService register error: ", error_4);
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.editUser = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.mutate({
                                mutation: M_AUTH_EDIT_USER,
                                variables: {
                                    data: input,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[AUTH_PATH_EDIT_USER]];
                        }
                        return [2 /*return*/, undefined];
                    case 2:
                        error_5 = _a.sent();
                        console.log("AuthService editUser error: ", error_5);
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.resetPassword = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.mutate({
                                mutation: M_AUTH_RESET_PASSWORD,
                                variables: {
                                    data: input,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[AUTH_PATH_RESET_PASSWORD]];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_6 = _a.sent();
                        console.log("AuthService resetPassword error: ", error_6);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.changeResetPassword = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.mutate({
                                mutation: M_AUTH_CHANGE_PASSWORD,
                                variables: {
                                    data: input,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[AUTH_PATH_CHANGE_RESET_PASSWORD]];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_7 = _a.sent();
                        console.log("AuthService changeResetPassword error: ", error_7);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.resendConfirmation = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.mutate({
                                mutation: M_AUTH_RESEND_CONFIRM,
                                variables: {
                                    data: input,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[AUTH_PATH_RESEND_CONFIRMATION]];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_8 = _a.sent();
                        console.log("AuthService resendConfirmation error: ", error_8);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.confirmEmail = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.mutate({
                                mutation: M_AUTH_CONFIRM_REGISTER,
                                variables: {
                                    data: input,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[AUTH_PATH_CONFIRM_REGIST]];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_9 = _a.sent();
                        console.log("AuthService confirmRegist error: ", error_9);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=AuthService.js.map