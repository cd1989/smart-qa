import { LOAD_DATA, LOAD_DATA_SUCCEED, LOAD_DATA_ERROR } from './constants';

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
