export interface AuthRoles {
    role: string;
    roles: AuthRoles[];
}

// utilizzare nomi singoli

export const authRoles: AuthRoles = {
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

export const SUPERADMIN = 'SUPERADMIN';
export const DEFAULT_ROLE = 'VISITOR';
