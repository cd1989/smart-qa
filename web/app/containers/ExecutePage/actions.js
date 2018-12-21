import { RUN_TEST, RUN_TEST_SUCCESS, OPERATION_ERROR, LOAD_RECORDS, LOAD_RECORDS_SUCCEED } from './constants';

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

export function loadRecords(environment) {
  return {
    type: LOAD_RECORDS,
    environment,
  };
}

export function loadRecordsSucceed(data) {
  return {
    type: LOAD_RECORDS_SUCCEED,
    data,
  };
}
