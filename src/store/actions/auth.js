import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER, SET_CURRENT_USER_GROUP } from '../actionTypes';
import { setCurrentGroup } from './group';
import { addError, removeError } from './errors';
import { setLoading } from './loading';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function setCurrentUserGroup(groupID) {
  return {
    type: SET_CURRENT_USER_GROUP,
    group: groupID
  }
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout() {
  return dispatch => {
    dispatch(setLoading(true));
    return new Promise(async (resolve, reject) => {
      try {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
        dispatch(setCurrentGroup({}));
        dispatch(setLoading(false));
        resolve();
      } catch (err) {
        dispatch(setLoading(false));
        dispatch(addError({ errorType: 'logoutUser', message: err }));
        reject();
      }
    })
  }
}

export function authUser(type, userData) {
  return dispatch => {
    dispatch(setLoading(true));
    return new Promise(async (resolve, reject) => {
      try {
        const { token, ...user } = await apiCall('post', `/api/auth/${type}`, userData);
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(user));
        if (user.group) {
          const group = await apiCall('get', `/api/group/${user.group}`);
          dispatch(setCurrentGroup(group))
          const usersInGroup = group.users.map(user => ({ _id: user._id, username: user.username, profileImageUrl: user.profileImageUrl }))
          localStorage.setItem('currentGroup', JSON.stringify({ _id: group._id, name: group.name, users: usersInGroup }));
        }
        dispatch(removeError());
        dispatch(setLoading(false));
        resolve(user); // API call suceeded
      } catch (err) {
        dispatch(setLoading(false));
        const error = {
          errorType: `authUser-${type}`,
          message: err.message
        }
        if (err) dispatch(addError(error));
        reject(err); // API call failed
      }
    })
  }
}