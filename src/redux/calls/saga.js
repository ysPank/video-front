import { all, call, fork, put, takeLatest } from "redux-saga/effects";

import { getTwilioConfigFail, getTwilioConfigSuccess } from "./actions";
import { GET_TWILLIO_CONFIG } from "../actions";
import { getTwilioConfig } from "../../api";

export function* watchGetTwilioConfig() {
  yield takeLatest(GET_TWILLIO_CONFIG, getConfig);
}

function* getConfig() {
  try {
    const servers = yield call(getTwilioConfig);

    yield put(getTwilioConfigSuccess(servers));
  } catch (error) {
    yield put(getTwilioConfigFail());
  }
}


export default function* rootSaga() {
  yield all([
    fork(watchGetTwilioConfig),
  ]);
}
