"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesResult = exports.Role = void 0;
const Roles_1 = require("./Roles");
class Role {
}
exports.Role = Role;
class RolesResult {
}
exports.RolesResult = RolesResult;
class Roles {
    constructor(json) {
        this.v = 1;
        this.r = [];
        this.level = -1;
        this.id = -1;
        this.maxLevel = 0;
        this.userRoles = {};
        try {
            this.parseRoles(Roles_1.authRoles, '');
            this.result = { roles: this.r, tree: Roles_1.authRoles, defaultRole: Roles_1.DEFAULT_ROLE };
            this.build(true);
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
    parseRoles(o, pre) {
        this.level++;
        this.id++;
        let k = `${pre}.${o.role}`.toUpperCase();
        if (`${pre}.${o.role}` == `.${Roles_1.SUPERADMIN}`) {
            k = o.role;
        }
        else {
            k = k.replace(`.${Roles_1.SUPERADMIN}`, '');
        }
        this.r.push({
            key: k.toUpperCase(),
            path: `${pre}.${o.role}.`.toUpperCase(),
            user: this.v,
            route: 0,
            level: this.level,
            id: this.id,
        });
        this.maxLevel = Math.max(this.maxLevel, this.level);
        this.v = this.v << 1;
        if (o.roles.length > 0) {
            for (let i in o.roles) {
                this.parseRoles(o.roles[i], `${pre}.${o.role}`);
                this.level--;
            }
        }
    }
    getItem(key) {
        let val = 0;
        for (let i in this.r) {
            if (this.r[i].path == key) {
                val = this.r[i].user;
            }
            else if (this.r[i].path.includes(key)) {
                val += this.r[i].user;
            }
        }
        return val;
    }
    pad(s, size) {
        while (s.length < (size || 2)) {
            s = '0' + s;
        }
        return s;
    }
    spaces(s, size) {
        while (s.length < (size || 2)) {
            s = ' ' + s;
        }
        return s;
    }
    build(print) {
        if (print) {
            console.log('\n- ROLES ---------------------------------------------------------------------------------');
        }
        for (let i in this.r) {
            this.r[i].level = this.maxLevel - this.r[i].level;
            this.r[i].label = (this.r[i].path.slice(1, -1).split('.')[this.r[i].path.slice(1, -1).split('.').length - 1] || 'unknown').toUpperCase();
            this.r[i].route = this.getItem(this.r[i].path);
            let v = this.r[i];
            this.userRoles[this.r[i].label] = [v.user, v.route];
            if (print) {
                console.log(this.pad(v.user.toString(2), 16), this.pad(v.route.toString(2), 16), v.key);
            }
        }
        if (print) {
            console.log('- ROLES ---------------------------------------------------------------------------------\n');
        }
    }
}
exports.default = Roles;
//# sourceMappingURL=RolesClass.js.map