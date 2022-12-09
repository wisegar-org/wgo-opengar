import { __awaiter, __generator } from "tslib";
import { EMAIL_PATH_SEND_EMAIL, EMAIL_PATH_SEND_EMAIL_TO_APP, EMAIL_PATH_SEND_EMAIL_FROM_TO_APP, EMAIL_PATH_SEND_EMAIL_FROM_TO_ADDRESS_AND_APP, } from "@wisegar-org/wgo-base-models/build/email/server";
import { Q_EMAIL_SENDEMAIL, Q_EMAIL_SENDEMAILFROMTOAPP, Q_EMAIL_SENDEMAILTOADDRESSANDAPP, Q_EMAIL_SENDEMAILTOAPP, } from "./EmailServiceQueries";
import { ApiService } from "../../core/services/ApiService";
var EmailService = /** @class */ (function () {
    function EmailService() {
        this.apiService = ApiService.GetInstance();
    }
    EmailService.prototype.sendEmail = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiService.query({
                                query: Q_EMAIL_SENDEMAIL,
                                variables: {
                                    data: data,
                                },
                                fetchPolicy: "no-cache",
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response.data && response.data[EMAIL_PATH_SEND_EMAIL]) {
                            data_1 = response.data;
                            return [2 /*return*/, data_1[EMAIL_PATH_SEND_EMAIL].isSuccess];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EmailService.prototype.sendEmailToApp = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data_2, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiService.query({
                                query: Q_EMAIL_SENDEMAILTOAPP,
                                variables: {
                                    data: data,
                                },
                                fetchPolicy: "no-cache",
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response.data && response.data[EMAIL_PATH_SEND_EMAIL_TO_APP]) {
                            data_2 = response.data;
                            return [2 /*return*/, data_2[EMAIL_PATH_SEND_EMAIL_TO_APP].isSuccess];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EmailService.prototype.sendEmailFromToApp = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, sendEmailFromToApp, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiService.query({
                                query: Q_EMAIL_SENDEMAILFROMTOAPP,
                                variables: {
                                    data: data,
                                },
                                fetchPolicy: "no-cache",
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response.data && response.data.sendEmailFromToApp) {
                            sendEmailFromToApp = response.data.sendEmailFromToApp;
                            return [2 /*return*/, sendEmailFromToApp.isSuccess];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EmailService.prototype.sendEmailFromToAddressAndApp = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data_3, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiService.query({
                                query: Q_EMAIL_SENDEMAILTOADDRESSANDAPP,
                                variables: {
                                    data: data,
                                },
                                fetchPolicy: "no-cache",
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response.data &&
                            response.data[EMAIL_PATH_SEND_EMAIL_FROM_TO_ADDRESS_AND_APP]) {
                            data_3 = response.data;
                            return [2 /*return*/, data_3[EMAIL_PATH_SEND_EMAIL_FROM_TO_ADDRESS_AND_APP].isSuccess];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return EmailService;
}());
export { EmailService };
//# sourceMappingURL=EmailService.js.map