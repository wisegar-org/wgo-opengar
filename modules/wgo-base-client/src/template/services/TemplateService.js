import { __awaiter, __generator } from "tslib";
import { TEMPLATE_PATH_GET_BY_TYPE, TEMPLATE_PATH_POST, } from "@wisegar-org/wgo-base-models/build/template/server";
import { ApiService } from "../../core/services/ApiService";
import { M_TEMPLATE_SET, Q_TEMPLATE_GET_BY_TYPE, } from "./TemplateServiceQueries";
var TemplateService = /** @class */ (function () {
    function TemplateService() {
        this.apiInstance = ApiService.GetInstance();
    }
    TemplateService.prototype.getTemplateByType = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.query({
                                query: Q_TEMPLATE_GET_BY_TYPE,
                                variables: {
                                    type: type,
                                },
                                fetchPolicy: "no-cache",
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response &&
                            response.data &&
                            response.data[TEMPLATE_PATH_GET_BY_TYPE]) {
                            data = response.data;
                            return [2 /*return*/, data[TEMPLATE_PATH_GET_BY_TYPE]];
                        }
                        else
                            return [2 /*return*/, undefined];
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        throw "TemplateService getTemplateByType: ".concat(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TemplateService.prototype.setTemplate = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiInstance.mutate({
                                mutation: M_TEMPLATE_SET,
                                variables: {
                                    data: params,
                                },
                                fetchPolicy: "no-cache",
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response && response.data && response.data[TEMPLATE_PATH_POST]) {
                            data = response.data;
                            return [2 /*return*/, data[TEMPLATE_PATH_POST]];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_2 = _a.sent();
                        throw "TemplateService setTemplate: ".concat(error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TemplateService;
}());
export { TemplateService };
//# sourceMappingURL=TemplateService.js.map