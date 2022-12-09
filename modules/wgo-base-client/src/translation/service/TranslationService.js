import { __awaiter, __generator } from "tslib";
import { ApiService } from "../../core/services/ApiService";
import { Q_TRANSLATION_GETALL, Q_TRANSLATION_GETALLBYKEYS, M_TRANSLATION_SETTRANSLATION, Q_TRANSLATION_EXPORT_TRANSLATIONS, M_TRANSLATION_INPORT_TRANSLATIONS, M_TRANSLATION_DELETE_TRANSLATIONS, } from "./TranslationServiceQueries";
import { TRANSLATION_PATH_GET_ALL_TRANSLATION, TRANSLATION_PATH_GET_ALL_BY_KEYS, TRANSLATION_PATH_SET_TRANSLATION, TRANSLATION_PATH_EXPORT_TRANSLATION, TRANSLATION_PATH_IMPORT_TRANSLATION, TRANSLATION_PATH_DELETE_TRANSLATION, } from "@wisegar-org/wgo-base-models/build/translation/server";
var TranslationService = /** @class */ (function () {
    function TranslationService() {
        this.apiInstance = ApiService.GetInstance();
    }
    TranslationService.prototype.getAllTranslation = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.query({
                                query: Q_TRANSLATION_GETALL,
                                fetchPolicy: "no-cache",
                                variables: {
                                    data: data,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data_1 = response.data;
                            return [2 /*return*/, data_1[TRANSLATION_PATH_GET_ALL_TRANSLATION]];
                        }
                        return [2 /*return*/, []];
                    case 2:
                        error_1 = _a.sent();
                        console.log("TranslationService getAllTranslation error: ", error_1);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TranslationService.prototype.getAllTranslationByKey = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data_2, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.query({
                                query: Q_TRANSLATION_GETALLBYKEYS,
                                fetchPolicy: "no-cache",
                                variables: {
                                    data: data,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data_2 = response.data;
                            return [2 /*return*/, data_2[TRANSLATION_PATH_GET_ALL_BY_KEYS]];
                        }
                        return [2 /*return*/, []];
                    case 2:
                        error_2 = _a.sent();
                        console.log("TranslationService getAllTranslationByKey error: ", error_2);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TranslationService.prototype.setTranslation = function (lang) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.mutate({
                                mutation: M_TRANSLATION_SETTRANSLATION,
                                variables: {
                                    data: lang,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[TRANSLATION_PATH_SET_TRANSLATION]];
                        }
                        return [2 /*return*/, []];
                    case 2:
                        error_3 = _a.sent();
                        console.log("TranslationService setTranslation error: ", error_3);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TranslationService.prototype.deleteTranslation = function (translation) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.mutate({
                                mutation: M_TRANSLATION_DELETE_TRANSLATIONS,
                                variables: {
                                    data: translation,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[TRANSLATION_PATH_DELETE_TRANSLATION]];
                        }
                        return [2 /*return*/, []];
                    case 2:
                        error_4 = _a.sent();
                        console.log("TranslationService deleteTranslation error: ", error_4);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TranslationService.prototype.importTranslations = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data_3, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.mutate({
                                mutation: M_TRANSLATION_INPORT_TRANSLATIONS,
                                variables: {
                                    data: data,
                                },
                                fetchPolicy: "no-cache",
                                context: {
                                    hasUpload: true,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data_3 = response.data;
                            return [2 /*return*/, data_3[TRANSLATION_PATH_IMPORT_TRANSLATION]];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_5 = _a.sent();
                        console.log("TranslationService setTranslation error: ", error_5);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TranslationService.prototype.exportTranslations = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data_4, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.query({
                                query: Q_TRANSLATION_EXPORT_TRANSLATIONS,
                                fetchPolicy: "no-cache",
                                variables: {
                                    data: data,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data_4 = response.data;
                            return [2 /*return*/, data_4[TRANSLATION_PATH_EXPORT_TRANSLATION]];
                        }
                        return [2 /*return*/, ""];
                    case 2:
                        error_6 = _a.sent();
                        console.log("TranslationService exportTranslations error: ", error_6);
                        return [2 /*return*/, ""];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TranslationService;
}());
export { TranslationService };
//# sourceMappingURL=TranslationService.js.map