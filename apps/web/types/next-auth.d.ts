import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
        } & DefaultSession['user'];
        accessToken: string;
        refreshToken: string;
        accessTokenExpires: number;
        error?: string;
    }

    interface User extends DefaultUser {
        id: string;
        email: string;
        name: string;
        accessToken: string;
        refreshToken: string;
        accessTokenExpires: number;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        accessToken: string;
        refreshToken: string;
        accessTokenExpires: number;
        error?: string;
    }
}