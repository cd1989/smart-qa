import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { RUN_TEST, LOAD_RECORDS } from './constants';
import { runTestSucceed, opError, loadRecordsSucceed, loadRecords } from './actions';

export function* runTest(action) {
  try {
    const result = yield call(() => axios.post('/api/execute', action.data));
    yield put(runTestSucceed(result.data));
  } catch (err) {
    yield put(opError(err));
  }
  yield put(loadRecords(action.data.envName));
}

export function* getRecords(action) {
  try {
    const result = yield call(() => axios.get(`/api/records?environment=${action.environment}`));
    console.log('aaa');
    yield put(loadRecordsSucceed(result.data));
  } catch (err) {
    console.log('bbb');
    yield put(opError(err));
  }
}

export default function* login() {
  yield takeLatest(RUN_TEST, runTest);
  yield takeLatest(LOAD_RECORDS, getRecords);
}
