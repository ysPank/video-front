import { all } from 'redux-saga/effects';

import usersSagas from './users/saga';
import socketsSagas from './sockets/saga';

export default function* rootSaga(getState) {
  yield all([
    usersSagas(),
    socketsSagas(),
  ]);
}
