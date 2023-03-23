import { __awaiter, __generator } from "tslib";
import { ApiService } from "../../core/services/ApiService";
import { M_LANGUAGE_POST, M_LANGUAGE_PUT, Q_LANGUAGE_GETALL, } from "./LanguageServiceQueries";
import { LANGUAGE_PATH_GET_ALL_LANGUAGE, LANGUAGE_PATH_POST_LANGUAGE, LANGUAGE_PATH_PUT_LANGUAGE, } from "@wisegar-org/wgo-base-models/build/language/server";
var LanguageService = /** @class */ (function () {
    function LanguageService() {
        this.apiInstance = ApiService.GetInstance();
    }
    LanguageService.prototype.getAllLanguage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.query({
                                query: Q_LANGUAGE_GETALL,
                                fetchPolicy: "no-cache",
                                variables: {},
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[LANGUAGE_PATH_GET_ALL_LANGUAGE]];
                        }
                        return [2 /*return*/, []];
                    case 2:
                        error_1 = _a.sent();
                        console.log("LanguageService getAllLanguage error: ", error_1);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LanguageService.prototype.postLanguage = function (lang) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.mutate({
                                mutation: M_LANGUAGE_POST,
                                variables: {
                                    data: lang,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[LANGUAGE_PATH_POST_LANGUAGE]];
                        }
                        return [2 /*return*/, undefined];
                    case 2:
                        error_2 = _a.sent();
                        console.log("LanguageService postLanguage error: ", error_2);
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LanguageService.prototype.putLanguage = function (lang) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.mutate({
                                mutation: M_LANGUAGE_PUT,
                                variables: {
                                    data: lang,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[LANGUAGE_PATH_PUT_LANGUAGE]];
                        }
                        return [2 /*return*/, undefined];
                    case 2:
                        error_3 = _a.sent();
                        console.log("LanguageService putLanguage error: ", error_3);
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return LanguageService;
}());
export { LanguageService };
//# sourceMappingURL=LanguageService.js.map