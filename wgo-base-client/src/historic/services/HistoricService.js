import { __awaiter, __generator } from "tslib";
import { ApiService } from "../../core/services/ApiService";
import { HISTORIC_PATH_GET_FILTERS, HISTORIC_PATH_GET_PAGE, } from "@wisegar-org/wgo-base-models/build/historic/server";
import { Q_HISTORIC_FILTER, Q_HISTORIC_PAGE } from "./HistoricServiceQueries";
var HistoricService = /** @class */ (function () {
    function HistoricService() {
        this.apiService = ApiService.GetInstance();
    }
    HistoricService.prototype.getHistoricPage = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiService.query({
                                query: Q_HISTORIC_PAGE,
                                variables: {
                                    data: data,
                                },
                                fetchPolicy: "no-cache",
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response.data && response.data[HISTORIC_PATH_GET_PAGE]) {
                            data_1 = response.data;
                            return [2 /*return*/, data_1[HISTORIC_PATH_GET_PAGE]];
                        }
                        return [2 /*return*/, {
                                count: 0,
                                histories: [],
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw "HistoricService getHistoricPage: ".concat(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HistoricService.prototype.getHistoricFilter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiService.query({
                                query: Q_HISTORIC_FILTER,
                                variables: {},
                                fetchPolicy: "no-cache",
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response.data && response.data[HISTORIC_PATH_GET_FILTERS]) {
                            data = response.data;
                            return [2 /*return*/, data[HISTORIC_PATH_GET_FILTERS]];
                        }
                        return [2 /*return*/, {
                                actions: [],
                                entities: [],
                                usernames: [],
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw "HistoricService getHistoricFilter: ".concat(error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return HistoricService;
}());
export { HistoricService };
//# sourceMappingURL=HistoricService.js.map