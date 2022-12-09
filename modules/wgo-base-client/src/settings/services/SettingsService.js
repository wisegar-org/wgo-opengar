import { __awaiter, __generator } from "tslib";
import { SETTINGS_PATH_GET_ALL_SETTINGS, SETTINGS_PATH_SET_SETTING, } from "@wisegar-org/wgo-base-models/build/settings/server";
import { ApiService } from "../../core/services/ApiService";
import { M_SETTING_POST, Q_SETTINGS_GETALL } from "./SettingsServiceQueries";
var SettingsService = /** @class */ (function () {
    function SettingsService() {
        this.apiInstance = ApiService.GetInstance();
    }
    SettingsService.prototype.getAllSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.query({
                                query: Q_SETTINGS_GETALL,
                                fetchPolicy: "no-cache",
                                variables: {},
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[SETTINGS_PATH_GET_ALL_SETTINGS]];
                        }
                        return [2 /*return*/, []];
                    case 2:
                        error_1 = _a.sent();
                        console.log("SettingsService getAllSettings error: ", error_1);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SettingsService.prototype.postSettings = function (setting) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.mutate({
                                mutation: M_SETTING_POST,
                                variables: {
                                    data: setting,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data) {
                            data = response.data;
                            return [2 /*return*/, data[SETTINGS_PATH_SET_SETTING]];
                        }
                        return [2 /*return*/, undefined];
                    case 2:
                        error_2 = _a.sent();
                        console.log("SettingsService postSettings error: ", error_2);
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return SettingsService;
}());
export { SettingsService };
//# sourceMappingURL=SettingsService.js.map