import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import auth from 'utils/auth';
import * as constants from './constants';
// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(constants.GET_PRODUCTS_INIT, getProductsSaga);
}

export function* getProductsSaga() {
  try {
    const requestURL = `https://fakestoreapi.com/products`;
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${auth.getToken()}`,
      },
    });
    if (response) {
      yield put({
        type: constants.GET_PRODUCTS_SUCCESS,
        response,
      });
    }
  } catch (error) {
    yield put({
      type: constants.GET_PRODUCTS_FAILED,
      error,
    });
  }
}
