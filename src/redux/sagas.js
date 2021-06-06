import { all } from 'redux-saga/effects';

import usersSagas from './users/saga';

export default function* rootSaga(getState) {
  yield all([
    usersSagas(),
  ]);
}
