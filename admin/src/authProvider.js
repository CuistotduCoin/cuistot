import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_CHECK,
  AUTH_ERROR,
} from 'react-admin';
import { Auth } from 'aws-amplify';

const isAdmin = user => user.signInUserSession.idToken.payload['cognito:groups'].includes('Admin');

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    return Auth.signIn(username, password)
      .then((user) => {
        if (isAdmin(user)) {
          return Promise.resolve();
        }
        return Promise.reject();
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject();
      });
  }
  if (type === AUTH_LOGOUT) {
    console.log('logout');
    return Auth.signOut()
      .then(() => Promise.resolve())
      .catch((err) => {
        console.log(err);
        return Promise.reject();
      });
  }
  if (type === AUTH_ERROR) {
    return Promise.reject();
  }
  if (type === AUTH_CHECK) {
    return Auth.currentAuthenticatedUser()
      .then((user) => {
        if (isAdmin(user)) {
          return Promise.resolve();
        }
        return Promise.reject();
      })
      .catch(() => {
        console.log('Not authenticated');
        return Promise.reject();
      });
  }
  return Promise.reject(new Error('Unkown method'));
};
