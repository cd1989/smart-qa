import {fromJS} from 'immutable';
import {LOAD_RECORDS, LOAD_RECORDS_SUCCEED, OPERATION_ERROR, RUN_TEST, RUN_TEST_SUCCESS} from './constants';

export const initialState = fromJS({
  error: false,
  processing: false,
  data: [],
});

export function reducer(state = initialState, action) {
  switch (action.type) {
    case RUN_TEST:
      return state
        .set('processing', true)
        .set('error', false);
    case RUN_TEST_SUCCESS:
      return state
        .set('processing', false)
        .set('error', false);
    case OPERATION_ERROR:
      return state
        .set('processing', false)
        .set('error', action.error);
    case LOAD_RECORDS:
      return state
        .set('processing', true)
        .set('error', false);
    case LOAD_RECORDS_SUCCEED:
      return state
        .set('processing', false)
        .set('error', false)
        .set('data', action.data || []);
    default:
      return state;
  }
}
