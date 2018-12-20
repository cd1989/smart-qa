import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { RUN_TEST } from './constants';
import { runTestSucceed, opError } from './actions';

export function* runTest(action) {
  try {
    const result = yield call(() => axios.post('/api/execute', action.data));
    yield put(runTestSucceed(result.data));
  } catch (err) {
    yield put(opError(err));
  }
}

export default function* login() {
  yield takeLatest(RUN_TEST, runTest);
}
