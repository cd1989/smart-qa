import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_DATA } from './constants';
import { loadDataSuccess, loadDataError } from './actions';

export function* fetchData(action) {
  try {
    const result = yield call(() => axios.get('/api/environments'));
    yield put(loadDataSuccess(result.data));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export default function* login() {
  yield takeLatest(LOAD_DATA, fetchData);
}
