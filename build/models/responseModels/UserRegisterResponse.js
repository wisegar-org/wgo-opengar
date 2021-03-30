"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterErrorResponse = void 0;
const BasicResponse_1 = require("./BasicResponse");
class UserRegisterErrorResponse extends BasicResponse_1.ErrorResponse {
    /**
     *
     */
    constructor(errorProperty, message) {
        super(message);
        this.errorProperty = errorProperty;
    }
}
exports.UserRegisterErrorResponse = UserRegisterErrorResponse;
//# sourceMappingURL=UserRegisterResponse.js.map