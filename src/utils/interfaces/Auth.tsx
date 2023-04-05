export interface LoginProps {
    email: string
    password: string
}

export interface RegisterProps {
    email: string;
    password: string
    password_confirm: string
}


export interface AuthToken {
    accessToken: string
    refreshToken: string
}