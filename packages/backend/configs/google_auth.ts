import { Envs } from './config'

export type GoogleAuthConfig = {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}

export const GetGoogleAuthConfig = (): GoogleAuthConfig => {
    return {
        clientId: Envs.GOOGLE_CLIENT_ID,
        clientSecret: Envs.GOOGLE_CLIENT_SECRET,
        redirectUri: Envs.GOOGLE_REDIRECT_URI
    };
} 