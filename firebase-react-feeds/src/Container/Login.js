import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase';
import { LoginContainer } from '../app-style';
function Login({
    history
}) {


    const onGoogleLogin = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const loginResult = await firebase.auth().signInWithPopup(provider);
            if (loginResult.credential.accessToken && loginResult.user) {
                history.push({
                    pathname: '/home'
                });
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <LoginContainer>
            <Button onClick={() => onGoogleLogin()}>
                <Button.Content visible>
                    <Icon name='google' />
                    Login
                </Button.Content>
            </Button>
        </LoginContainer>
    )
}

export default withRouter(Login);