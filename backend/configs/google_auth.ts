import { Envs } from './config'
import { Container } from 'inversify';

export const GoogleAuthConfigToken = Symbol.for('GoogleAuthConfig');

export type GoogleAuthConfig = {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}

export  const registerGoogleAuthConfig = (container: Container): void => {
    const config = GetGoogleAuthConfig();
    container.bind<GoogleAuthConfig>(GoogleAuthConfigToken).toConstantValue(config);
}

const GetGoogleAuthConfig = (): GoogleAuthConfig => {
    return {
        clientId: Envs.GOOGLE_CLIENT_ID,
        clientSecret: Envs.GOOGLE_CLIENT_SECRET,
        redirectUri: Envs.GOOGLE_REDIRECT_URI
    };
} 