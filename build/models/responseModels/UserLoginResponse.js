"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginErrorResponse = exports.UserLoginSuccessResponse = exports.UserResponse = void 0;
const BasicResponse_1 = require("./BasicResponse");
class UserResponse {
    /**
     *
     */
    constructor(id, name, lastName, userName, email, token, profileImage, roles) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.token = token;
        this.profileImage = profileImage;
        this.roles = roles;
    }
}
exports.UserResponse = UserResponse;
class UserLoginSuccessResponse extends BasicResponse_1.SuccessResponse {
    /**
     *
     */
    constructor(id, name, lastName, userName, email, token, profileImage, roles) {
        super();
        this.user = new UserResponse(id, name, lastName, userName, email, token, profileImage, roles);
    }
}
exports.UserLoginSuccessResponse = UserLoginSuccessResponse;
class UserLoginErrorResponse extends BasicResponse_1.ErrorResponse {
    /**
     *
     */
    constructor(message, isCheckEmailError) {
        super(message);
        this.isCheckEmailError = !!isCheckEmailError;
    }
}
exports.UserLoginErrorResponse = UserLoginErrorResponse;
//# sourceMappingURL=UserLoginResponse.js.map