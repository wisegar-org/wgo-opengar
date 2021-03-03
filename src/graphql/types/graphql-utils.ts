import { AuthChecker } from "type-graphql";

// export interface ResolverMap {
//     [key: string]: {
//         [key: string]: (parent: any, args: any, context: any) => any
//     }
// }

 export interface IContextUser {
    userId: string;
    email: string;
    roles: string[];
    extra: { [key: string]: string };
}

export interface Context {
    user?: IContextUser | undefined;
}

export const formatError = (err: Error) => {
    return new Error(err.message);
};

export const authChecker: AuthChecker<Context> = ({ context: { user } }, roles) => {
    if (roles.length === 0) {
        if (user !== undefined) return true;
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
