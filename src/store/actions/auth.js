import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { setCurrentGroup } from './group';
import { addError, removeError } from './errors';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout() {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
        dispatch(setCurrentGroup(null));
        resolve();
      } catch (err) {
        dispatch(addError({ errorType: 'logoutUser', errorMessage: err }));
        reject();
      }
    })
  }
}

export function authUser(type, userData) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const { token, ...user } = await apiCall('post', `/api/auth/${type}`, userData);
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(user));
        dispatch(removeError());
        resolve(user); // API call suceeded
      } catch (err) {
        if (err) dispatch(addError({ errorType: 'authUser', errorMessage: err.message }));
        reject(); // API call failed
      }
    })
  }
}