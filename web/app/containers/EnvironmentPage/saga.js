import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_DATA, ADD_NEW_ENV, DELETE_ENVS } from './constants';
import { loadData, loadDataSuccess, loadDataError, opError } from './actions';

export function* fetchData(action) {
  try {
    const result = yield call(() => axios.get('/api/environments'));
    yield put(loadDataSuccess(result.data));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export function* addNew(action) {
  try {
    yield call(() => axios.post('/api/environments', action.data));
    yield put(loadData());
  } catch (err) {
    yield put(opError(err));
  }
}

export function* deleteEnvs(action) {
  try {
    yield* action.names.map(function* (name) {
      yield call(() => axios.delete(`/api/environments/${name}`));
    });
    yield put(loadData());
  } catch (err) {
    yield put(opError(err));
  }
}

export default function* login() {
  yield takeLatest(LOAD_DATA, fetchData);
  yield takeLatest(ADD_NEW_ENV, addNew);
  yield takeLatest(DELETE_ENVS, deleteEnvs);
}
