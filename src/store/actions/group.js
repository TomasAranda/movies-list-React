import { apiCall } from '../../services/api';
import { SET_CURRENT_GROUP } from '../actionTypes';
import { setCurrentUserGroup } from './auth';
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

function setUserGroup(groupName, isExistentGroup) {
  return new Promise(async (resolve, reject) => {
    try {
      let group;
      if (isExistentGroup) {
        const foundGroup = await findGroup(groupName);
        group = await apiCall('put', `/api/group/${foundGroup._id}`);
      } else {
        group = await apiCall('post', '/api/group', { name: groupName });
      }
      console.log(group);
      resolve(group);
    } catch (error) {
      console.log()
      reject(error);
    }
  })
}

export function setGroup(groupName, isExistentGroup) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const group = await setUserGroup(groupName, isExistentGroup);
        dispatch(setCurrentGroup(group));
        const usersInGroup = group.users.map(user => ({ _id: user._id, username: user.username, profileImageUrl: user.profileImageUrl }))
        localStorage.setItem('currentGroup', JSON.stringify({ _id: group._id, name: group.name, users: usersInGroup }));
        dispatch(setCurrentUserGroup(group._id));
        dispatch(removeError());
        resolve(); // API call suceeded
      } catch (err) {
        if (err) dispatch(addError({ errorType: isExistentGroup ? 'editGroup' : 'createGroup', message: err.message }));
        reject(err); // API call failed
      }
    })
  }
}