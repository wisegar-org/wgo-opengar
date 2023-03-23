import { __awaiter, __generator } from "tslib";
import { TranslationStore } from "../../translation/store/TranslationStore";
import { LANGUAGE_ID } from "@wisegar-org/wgo-base-models/build/language/constants";
import { LanguageService } from "../service/LanguageService";
var LanguageStore = /** @class */ (function () {
    /**
     *
     */
    function LanguageStore(translationStore) {
        this.allLangs = [];
        this.selectedLang = {};
        this.defaultLang = {};
        this.translationStore = translationStore
            ? translationStore
            : new TranslationStore();
    }
    LanguageStore.prototype.loadAllLanguage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var languageService, languages, languageDefaults, langDefault, selected;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        languageService = new LanguageService();
                        return [4 /*yield*/, languageService.getAllLanguage()];
                    case 1:
                        languages = _a.sent();
                        if (!(languages.length > 0)) return [3 /*break*/, 3];
                        languageDefaults = languages.filter(function (lang) { return lang.default; });
                        langDefault = languageDefaults.length > 0 ? languageDefaults[0] : languages[0];
                        selected = this.selectedLang &&
                            languages.findIndex(function (item) { return item.code === _this.selectedLang.code; }) !==
                                -1
                            ? this.selectedLang
                            : langDefault;
                        return [4 /*yield*/, this.setSelectedLang(selected)];
                    case 2:
                        _a.sent();
                        this.defaultLang = langDefault;
                        this.allLangs = languages;
                        return [3 /*break*/, 4];
                    case 3:
                        this.allLangs = [];
                        this.selectedLang = {};
                        this.defaultLang = {};
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LanguageStore.prototype.setSelectedLang = function (langSelected) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.selectedLang.id !== langSelected.id)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.translationStore.setLanguageId(langSelected.id)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        localStorage.setItem(LANGUAGE_ID, "".concat(langSelected.id));
                        this.selectedLang = langSelected;
                        return [2 /*return*/];
                }
            });
        });
    };
    LanguageStore.prototype.addLanguage = function (lang) {
        return __awaiter(this, void 0, void 0, function () {
            var languageService, langResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        languageService = new LanguageService();
                        return [4 /*yield*/, languageService.postLanguage(lang)];
                    case 1:
                        langResult = _a.sent();
                        if (!!!langResult) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.loadAllLanguage()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, !!langResult];
                }
            });
        });
    };
    LanguageStore.prototype.editLanguage = function (lang) {
        return __awaiter(this, void 0, void 0, function () {
            var languageService, langResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        languageService = new LanguageService();
                        return [4 /*yield*/, languageService.putLanguage(lang)];
                    case 1:
                        langResult = _a.sent();
                        if (!!!langResult) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.loadAllLanguage()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, !!langResult];
                }
            });
        });
    };
    LanguageStore.prototype.allLanguage = function () {
        return this.allLangs.filter(function (lang) { return lang.enabled; });
    };
    LanguageStore.prototype.setTranslationStore = function (translationStore) {
        this.translationStore = translationStore;
    };
    return LanguageStore;
}());
export { LanguageStore };
//# sourceMappingURL=LanguageStore.js.map