export interface AuthGuardType {
    children: React.ReactNode;
    allowedRoles: string[];
};


export interface SetUserType {
    username: string;
    password: string;
};


export interface User  {
    username: string;
    password?: string;
    role: string;
};

export interface  AuthState  {
    user: User | null;
    users: User[]
};


// export interface AuthState { user: User | null; error: string | null };
