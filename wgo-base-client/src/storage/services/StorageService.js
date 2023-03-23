import { __awaiter, __generator } from "tslib";
import { ApiService } from "../../core/services/ApiService";
import { STORAGE_PATH_DELETE_STORAGE, STORAGE_PATH_GET_STORAGE_BY_PAGE, STORAGE_PATH_GET_STORAGE_BY_TYPE, STORAGE_PATH_POST_STORAGE, STORAGE_PATH_PUT_STORAGE, } from "@wisegar-org/wgo-base-models/build/storage/server";
import { Q_STORAGE_ITEMSBYPAGE, M_STORAGE_CREATEITEM, M_STORAGE_MODIFYITEM, M_STORAGE_DELETEITEM, Q_STORAGE_ALLITEMS, } from "./StorageServiceQueries";
var StorageService = /** @class */ (function () {
    function StorageService() {
        this.apiService = ApiService.GetInstance();
    }
    StorageService.prototype.getStorageByPagination = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiService.query({
                                query: Q_STORAGE_ITEMSBYPAGE,
                                variables: {
                                    data: data,
                                },
                                fetchPolicy: "no-cache",
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response.data && response.data[STORAGE_PATH_GET_STORAGE_BY_PAGE]) {
                            data_1 = response.data;
                            return [2 /*return*/, data_1[STORAGE_PATH_GET_STORAGE_BY_PAGE]];
                        }
                        return [2 /*return*/, { storageItemsCount: 0, storageItems: [] }];
                    case 2:
                        error_1 = _a.sent();
                        throw "StorageService getStorageByPagination: ".concat(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StorageService.prototype.getStorageByType = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data_2, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiService.query({
                                query: Q_STORAGE_ALLITEMS,
                                variables: {
                                    data: data,
                                },
                                fetchPolicy: "no-cache",
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response.data && response.data[STORAGE_PATH_GET_STORAGE_BY_TYPE]) {
                            data_2 = response.data;
                            return [2 /*return*/, data_2[STORAGE_PATH_GET_STORAGE_BY_TYPE]];
                        }
                        return [2 /*return*/, []];
                    case 2:
                        error_2 = _a.sent();
                        throw "StorageService getStorageByType: ".concat(error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StorageService.prototype.createStorageItem = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data_3, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiService.mutate({
                                mutation: M_STORAGE_CREATEITEM,
                                variables: {
                                    data: data,
                                },
                                fetchPolicy: "no-cache",
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response.data && response.data[STORAGE_PATH_POST_STORAGE]) {
                            data_3 = response.data;
                            return [2 /*return*/, data_3[STORAGE_PATH_POST_STORAGE]];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_3 = _a.sent();
                        throw "StorageService createStorageItem: ".concat(error_3);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StorageService.prototype.modifyStorageItem = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data_4, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiService.mutate({
                                mutation: M_STORAGE_MODIFYITEM,
                                variables: {
                                    data: data,
                                },
                                fetchPolicy: "no-cache",
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response.data && response.data[STORAGE_PATH_PUT_STORAGE]) {
                            data_4 = response.data;
                            return [2 /*return*/, data_4[STORAGE_PATH_PUT_STORAGE]];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_4 = _a.sent();
                        throw "StorageService modifyStorageItem: ".concat(error_4);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StorageService.prototype.deleteStorageItem = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiService.mutate({
                                mutation: M_STORAGE_DELETEITEM,
                                variables: {
                                    id: id,
                                },
                                fetchPolicy: "no-cache",
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response.data && response.data[STORAGE_PATH_DELETE_STORAGE]) {
                            data = response.data;
                            return [2 /*return*/, data[STORAGE_PATH_DELETE_STORAGE]];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_5 = _a.sent();
                        throw "StorageService deleteStorageItem: ".concat(error_5);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return StorageService;
}());
export { StorageService };
//# sourceMappingURL=StorageService.js.map