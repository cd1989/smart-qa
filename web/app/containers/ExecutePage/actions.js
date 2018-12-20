import { RUN_TEST, RUN_TEST_SUCCESS, OPERATION_ERROR } from './constants';

export function runTest(suite) {
  return {
    type: RUN_TEST,
    suite,
  };
}

export function runTestSucceed(data) {
  return {
    type: RUN_TEST_SUCCESS,
    data,
  };
}

export function opError(error) {
  return {
    type: OPERATION_ERROR,
    error,
  }
}
