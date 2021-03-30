"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = exports.SuccessResponse = exports.Response = void 0;
class Response {
}
exports.Response = Response;
class SuccessResponse extends Response {
    constructor(result, message) {
        super();
        this.isSuccess = true;
        this.message = message ? message : null;
        this.result = result ? result : null;
        this.error = null;
    }
    static Response(result, message) {
        return new SuccessResponse(result, message);
    }
}
exports.SuccessResponse = SuccessResponse;
class ErrorResponse {
    constructor(error, message) {
        this.isSuccess = false;
        this.message = message ? message : null;
        this.result = null;
        this.error = error;
    }
    static Response(error, message) {
        return new ErrorResponse(error, message);
    }
}
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=Response.js.map