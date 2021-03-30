"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveImageResponse = void 0;
const BasicResponse_1 = require("./BasicResponse");
class SaveImageResponse extends BasicResponse_1.SuccessResponse {
    /**
     *
     */
    constructor(id, url) {
        super();
        this.idImage = id;
        this.urlImage = url;
    }
}
exports.SaveImageResponse = SaveImageResponse;
//# sourceMappingURL=MediaResponse.js.map