import {
  LOAD_DATA,
  LOAD_DATA_SUCCEED,
  LOAD_DATA_ERROR,
  ADD_NEW_ENV,
  OPERATE_ERROR,
  DELETE_ENVS } from './constants';

export function loadData() {
  return {
    type: LOAD_DATA,
  };
}

export function loadDataSuccess(data) {
  return {
    type: LOAD_DATA_SUCCEED,
    data,
  };
}

export function loadDataError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}

export function newEnvironment(data) {
  return {
    type: ADD_NEW_ENV,
    data,
  };
}

export function opError(error) {
  return {
    type: OPERATE_ERROR,
    error,
  }
}

export function deleteEnvironments(names) {
  return {
    type: DELETE_ENVS,
    names,
  }
}
