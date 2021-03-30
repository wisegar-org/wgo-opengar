"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = exports.SuccessResponse = exports.BasicResponse = void 0;
class BasicResponse {
    /**
     *
     */
    constructor(success, message) {
        this.success = success;
        this.message = message;
    }
}
exports.BasicResponse = BasicResponse;
class SuccessResponse extends BasicResponse {
    /**
     *
     */
    constructor(message) {
        super(true);
        this.message = message;
    }
}
exports.SuccessResponse = SuccessResponse;
class ErrorResponse extends BasicResponse {
    /**
     *
     */
    constructor(message) {
        super(false);
        this.message = message;
    }
}
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=BasicResponse.js.map