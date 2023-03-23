import { __awaiter, __generator } from "tslib";
import { StorageKeys } from "@wisegar-org/wgo-base-models/build/storage/constants";
import { TranslationService } from "../service/TranslationService";
var TranslationStore = /** @class */ (function () {
    function TranslationStore() {
        this.translations = {};
        this.translationsValue = {};
        this.onlyTranslations = [];
        this.languageId = 0;
    }
    TranslationStore.prototype.loadAllTranslation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var translationService, translations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        translationService = new TranslationService();
                        return [4 /*yield*/, translationService.getAllTranslation({
                                languageId: this.languageId,
                            })];
                    case 1:
                        translations = _a.sent();
                        this.updateObject(translations);
                        return [2 /*return*/];
                }
            });
        });
    };
    TranslationStore.prototype.setOnlySiteTranslationsList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.onlyTranslations = Object.values(this.translations).filter(function (traslation) { return !traslation.key.startsWith(StorageKeys); });
                return [2 /*return*/];
            });
        });
    };
    TranslationStore.prototype.getAllTranslationByLanguage = function (langId) {
        return __awaiter(this, void 0, void 0, function () {
            var translationService, translations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        translationService = new TranslationService();
                        return [4 /*yield*/, translationService.getAllTranslation({
                                languageId: langId,
                            })];
                    case 1:
                        translations = _a.sent();
                        return [2 /*return*/, translations];
                }
            });
        });
    };
    TranslationStore.prototype.loadAllTranslationByKeys = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var translationService, translations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        translationService = new TranslationService();
                        return [4 /*yield*/, translationService.getAllTranslationByKey({
                                languageId: this.languageId,
                                keys: keys,
                            })];
                    case 1:
                        translations = _a.sent();
                        this.updateObject(translations);
                        return [2 /*return*/];
                }
            });
        });
    };
    TranslationStore.prototype.getAllTranslationByKeysAndLanguage = function (langId, keys) {
        return __awaiter(this, void 0, void 0, function () {
            var translationService, translations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        translationService = new TranslationService();
                        return [4 /*yield*/, translationService.getAllTranslationByKey({
                                languageId: langId,
                                keys: keys,
                            })];
                    case 1:
                        translations = _a.sent();
                        return [2 /*return*/, translations];
                }
            });
        });
    };
    TranslationStore.prototype.getTranslation = function (key) {
        if (key in this.translations) {
            return this.translationsValue[key] || key;
        }
        else if ("".concat(key).toUpperCase().startsWith("WGO")) {
            this.loadAllTranslationByKeys([key]);
        }
        return key;
    };
    TranslationStore.prototype.getTranslationByLanguage = function (langId, key) {
        return __awaiter(this, void 0, void 0, function () {
            var translations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllTranslationByKeysAndLanguage(langId, [
                            key,
                        ])];
                    case 1:
                        translations = _a.sent();
                        if (translations && translations.length > 0) {
                            return [2 /*return*/, translations[0].value];
                        }
                        return [2 /*return*/, key];
                }
            });
        });
    };
    TranslationStore.prototype.setTranslation = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var translationService, translation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        translationService = new TranslationService();
                        return [4 /*yield*/, translationService.setTranslation(input)];
                    case 1:
                        translation = _a.sent();
                        return [2 /*return*/, translation];
                }
            });
        });
    };
    TranslationStore.prototype.setLanguageId = function (langId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.languageId = langId;
                        return [4 /*yield*/, this.loadAllTranslation()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TranslationStore.prototype.deleteTranslation = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var translationService, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        translationService = new TranslationService();
                        return [4 /*yield*/, translationService.deleteTranslation(input)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            delete this.translations[input.key];
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    TranslationStore.prototype.importTranslations = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var translationService, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        translationService = new TranslationService();
                        return [4 /*yield*/, translationService.importTranslations(input)];
                    case 1:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.loadAllTranslation()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, result];
                }
            });
        });
    };
    TranslationStore.prototype.exportTranslations = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var translationService, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        translationService = new TranslationService();
                        return [4 /*yield*/, translationService.exportTranslations(input)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    TranslationStore.prototype.updateObject = function (translations) {
        var _this = this;
        translations.forEach(function (translation) {
            _this.translations[translation.key] = translation;
            _this.translationsValue[translation.key] = translation.value;
        });
        this.setOnlySiteTranslationsList();
    };
    return TranslationStore;
}());
export { TranslationStore };
//# sourceMappingURL=TranslationStore.js.map