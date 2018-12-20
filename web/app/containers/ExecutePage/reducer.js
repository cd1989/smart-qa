import { fromJS } from 'immutable';
import { RUN_TEST, RUN_TEST_SUCCESS, OPERATION_ERROR } from './constants';

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
        .set('error', false)
        .set('data', action.data);
    case OPERATION_ERROR:
      return state
        .set('processing', false)
        .set('error', action.error);
    default:
      return state;
  }
}
