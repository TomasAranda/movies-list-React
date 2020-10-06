import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';

export const addError = error => ({
  type: ADD_ERROR,
  errorType: error.errorType,
  errorMessage: error.message,
});

export const removeError = () => ({
  type: REMOVE_ERROR,
});