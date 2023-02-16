import {Auth} from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import {config} from './config';
import {CognitoUser} from '@aws-amplify/auth'


Amplify.configure({
    Auth: {
        manditorySignIn: false,
        region: config.REGION,
        userPoolId: config.USER_POOL_ID,
        userPoolWebClientId: config.APP_CLIENT_ID,
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
});

export class AuthService {

    public async login(username: string, password: string): Promise<CognitoUser> {
        const user = await Auth.signIn(username, password) as CognitoUser;
        console.log(user);
        return user;
    }
}