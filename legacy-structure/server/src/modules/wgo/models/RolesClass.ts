import { AuthRoles, authRoles, SUPERADMIN, DEFAULT_ROLE } from './Roles';

export class Role {
    id: number;
    key: string;
    path: string;
    user: number;
    route: number;
    level: number;
    label?: string;
}

export class RolesResult {
    roles: Role[];
    tree: AuthRoles;
    defaultRole: string;
}

export default class Roles {
    v = 1;
    r: Role[] = [];
    level = -1;
    id = -1;
    maxLevel = 0;

    userRoles: { [key: string]: number[] } = {};
    result: RolesResult;

    constructor(json: string) {
        try {
            this.parseRoles(authRoles, '');
            this.result = { roles: this.r, tree: authRoles, defaultRole: DEFAULT_ROLE };
            this.build(true);
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    }

    parseRoles(o: AuthRoles, pre: string) {
        this.level++;
        this.id++;
        let k = `${pre}.${o.role}`.toUpperCase();
        if (`${pre}.${o.role}` == `.${SUPERADMIN}`) {
            k = o.role;
        } else {
            k = k.replace(`.${SUPERADMIN}`, '');
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

    getItem(key: string) {
        let val = 0;
        for (let i in this.r) {
            if (this.r[i].path == key) {
                val = this.r[i].user;
            } else if (this.r[i].path.includes(key)) {
                val += this.r[i].user;
            }
        }
        return val;
    }

    pad(s: string, size: number) {
        while (s.length < (size || 2)) {
            s = '0' + s;
        }
        return s;
    }

    spaces(s: string, size: number) {
        while (s.length < (size || 2)) {
            s = ' ' + s;
        }
        return s;
    }

    build(print: boolean) {
        if (print) {
            console.log('\n- ROLES ---------------------------------------------------------------------------------');
        }
        for (let i in this.r) {
            this.r[i].level = this.maxLevel - this.r[i].level;
            this.r[i].label = (this.r[i].path.slice(1, -1).split('.')[this.r[i].path.slice(1, -1).split('.').length - 1] || 'unknown').toUpperCase();
            this.r[i].route = this.getItem(this.r[i].path);
            let v = this.r[i];
            this.userRoles[this.r[i].label as string] = [v.user, v.route];
            if (print) {
                console.log(this.pad(v.user.toString(2), 16), this.pad(v.route.toString(2), 16), v.key);
            }
        }
        if (print) {
            console.log('- ROLES ---------------------------------------------------------------------------------\n');
        }
    }
}
