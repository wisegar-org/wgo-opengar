import { __awaiter, __generator } from "tslib";
import { ApiService } from "../../core/services/ApiService";
import { MEDIA_PATH_DELETE_FILES, MEDIA_PATH_GET_FILE, MEDIA_PATH_POST_FILE, MEDIA_PATH_POST_FILES, } from "@wisegar-org/wgo-base-models/build/storage/server";
import { M_MEDIA_DELETEFILE, M_MEDIA_UPLOADFILE, M_MEDIA_UPLOADFILES, Q_MEDIA_GETFILE, } from "./MediaServiceQueries";
var MediaService = /** @class */ (function () {
    function MediaService() {
        this.apiService = ApiService.GetInstance();
    }
    MediaService.prototype.uploadFile = function (data, urlApi) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiService.mutate({
                                mutation: M_MEDIA_UPLOADFILE,
                                variables: {
                                    data: data,
                                    urlApi: urlApi,
                                },
                                fetchPolicy: "no-cache",
                                context: {
                                    hasUpload: true,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response.data && response.data[MEDIA_PATH_POST_FILE]) {
                            data_1 = response.data;
                            return [2 /*return*/, data_1[MEDIA_PATH_POST_FILE]];
                        }
                        return [2 /*return*/, null];
                    case 2:
                        error_1 = _a.sent();
                        throw "MediaService uploadFile: ".concat(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MediaService.prototype.uploadFiles = function (data, urlApi) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data_2, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiService.mutate({
                                mutation: M_MEDIA_UPLOADFILES,
                                variables: {
                                    data: data,
                                    urlApi: urlApi,
                                },
                                fetchPolicy: "no-cache",
                                context: {
                                    hasUpload: true,
                                },
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response.data && response.data[MEDIA_PATH_POST_FILES]) {
                            data_2 = response.data;
                            return [2 /*return*/, data_2[MEDIA_PATH_POST_FILES]];
                        }
                        return [2 /*return*/, null];
                    case 2:
                        error_2 = _a.sent();
                        throw "MediaService uploadFiles: ".concat(error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MediaService.prototype.getFile = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiService.query({
                                query: Q_MEDIA_GETFILE,
                                variables: {
                                    id: id,
                                },
                                fetchPolicy: "no-cache",
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response.data && response.data[MEDIA_PATH_GET_FILE]) {
                            data = response.data;
                            return [2 /*return*/, data[MEDIA_PATH_GET_FILE]];
                        }
                        return [2 /*return*/, null];
                    case 2:
                        error_3 = _a.sent();
                        throw "MediaService getFile: ".concat(error_3);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MediaService.prototype.deleteFile = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiService.mutate({
                                mutation: M_MEDIA_DELETEFILE,
                                variables: {
                                    id: id,
                                },
                                fetchPolicy: "no-cache",
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response.data && response.data[MEDIA_PATH_DELETE_FILES]) {
                            data = response.data;
                            return [2 /*return*/, data[MEDIA_PATH_DELETE_FILES]];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_4 = _a.sent();
                        throw "MediaService deleteFile: ".concat(error_4);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return MediaService;
}());
export { MediaService };
//# sourceMappingURL=MediaService.js.map