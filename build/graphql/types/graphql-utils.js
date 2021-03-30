"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authChecker = exports.formatError = void 0;
const formatError = (err) => {
    return new Error(err.message);
};
exports.formatError = formatError;
const authChecker = ({ context: { user } }, roles) => {
    if (roles.length === 0) {
        if (user !== undefined)
            return true;
        throw new Error('not authorized');
    }
    // there are some roles defined now
    if (!user) {
        // and if no user, restrict access
        throw new Error('not authorized');
    }
    if (user.roles.some((role) => roles.includes(role))) {
        // grant access if the roles overlap
        return true;
    }
    // no roles matched, restrict access
    throw new Error('not authorized');
};
exports.authChecker = authChecker;
//# sourceMappingURL=graphql-utils.js.map