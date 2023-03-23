import { __awaiter, __generator } from "tslib";
import { MediaService } from "../../../storage/services/MediaService";
var UploadAdapter = /** @class */ (function () {
    /**
     *
     */
    function UploadAdapter(loader, urlApi) {
        this.loader = loader;
        this.urlApi = urlApi;
    }
    UploadAdapter.prototype.upload = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.loader.file.then(function (file) { return __awaiter(_this, void 0, void 0, function () {
                var mediaService, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mediaService = new MediaService();
                            return [4 /*yield*/, mediaService.uploadFile({
                                    file: file,
                                    isPublic: true,
                                }, this.urlApi)];
                        case 1:
                            result = _a.sent();
                            if (result && result.url)
                                res({
                                    default: result.url,
                                });
                            else
                                rej();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    UploadAdapter.prototype.abort = function () {
        //todo
    };
    return UploadAdapter;
}());
export { UploadAdapter };
//# sourceMappingURL=UploadAdapter.js.map