import { RUN_TEST, RUN_TEST_SUCCESS, OPERATION_ERROR } from './constants';

export function runTest(data) {
  return {
    type: RUN_TEST,
    data,
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
