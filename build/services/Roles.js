"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ROLE = exports.SUPERADMIN = exports.authRoles = void 0;
// utilizzare nomi singoli
exports.authRoles = {
    role: 'superadmin',
    roles: [
        {
            role: 'appadmin',
            roles: [
                {
                    role: 'user',
                    roles: [
                        {
                            role: 'visitor',
                            roles: [],
                        },
                    ],
                },
            ],
        },
        {
            role: 'supervisor',
            roles: [],
        },
    ],
};
exports.SUPERADMIN = 'SUPERADMIN';
exports.DEFAULT_ROLE = 'VISITOR';
//# sourceMappingURL=Roles.js.map