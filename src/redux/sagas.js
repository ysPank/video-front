import { all } from 'redux-saga/effects';

import usersSagas from './users/saga';
import socketsSagas from './sockets/saga';
import callsSagas from './calls/saga';

export default function* rootSaga(getState) {
  yield all([
    usersSagas(),
    callsSagas(),
    socketsSagas(),
  ]);
}
