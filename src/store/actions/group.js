import { apiCall } from '../../services/api';
import { SET_CURRENT_GROUP } from '../actionTypes';
import { addError, removeError } from './errors';

export function setCurrentGroup(group) {
  return {
    type: SET_CURRENT_GROUP,
    group
  }
}

function findGroup(groupName) {
  return new Promise((resolve, reject) => {
    apiCall('get', '/api/group')
      .then(data => {
        let foundGroup = data.find(group => group.name === groupName);
        if (foundGroup === undefined) return reject({ message: 'Group does not exist' });
        resolve(foundGroup);
      })
      .catch((err) => {
        console.log('Error with finding group: ', err);
        reject(err);
      })
  });
}

export function createGroup(groupName) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const group = await apiCall('post', '/api/group', { name: groupName });
        dispatch(setCurrentGroup(group));
        dispatch(removeError());
        resolve(); // API call suceeded
      } catch (err) {
        if (err) dispatch(addError({ errorType: 'createGroup', message: err.message }));
        reject(err); // API call failed
      }
    })
  }
}

export function editGroup(groupName) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const foundGroup = await findGroup(groupName);
        const group = await apiCall('put', `/api/group/${foundGroup._id}`);
        dispatch(setCurrentGroup(group));
        dispatch(removeError());
        resolve(); // API call suceeded
      } catch (err) {
        if (err) dispatch(addError({ errorType: 'editGroup', message: err.message }));
        reject(err); // API call failed
      }
    })
  }
}