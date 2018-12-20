import { fromJS } from 'immutable';
import {
  LOAD_DATA,
  LOAD_DATA_SUCCEED,
  LOAD_DATA_ERROR,
  ADD_NEW_ENV,
  OPERATE_ERROR,
  DELETE_ENVS } from './constants';

export const initialState = fromJS({
  error: false,
  processing: false,
  data: []
});

export function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return state
        .set('processing', true)
        .set('error', false);
    case LOAD_DATA_SUCCEED:
      return state
        .set('data', fromJS(action.data))
        .set('error', false)
        .set('processing', false);
    case LOAD_DATA_ERROR:
      return state
        .set('processing', false)
        .set('error', action.error)
        .set('data', []);
    case ADD_NEW_ENV:
      return state;
    case DELETE_ENVS:
      return state;
    case OPERATE_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}
