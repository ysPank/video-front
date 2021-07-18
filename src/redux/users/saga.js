import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";

import { getUsersError, getUsersSuccess } from "./actions";
import { GET_USERS } from "../actions";
import { getUserList } from "../../api";
import { updatePaginationState } from "../../helpers/pagination";

export function* watchGetUsers() {
  yield takeEvery(GET_USERS, getUsers);
}

const getUsersAsync = (params) => async () => {
  return getUserList(params);
};

function* getUsers() {
  const { offset, users } = yield select(state => state.users);

  try {
    const { data, pagination } = yield call(getUsersAsync({ offset }));
    yield put(getUsersSuccess({
      pagination: updatePaginationState(pagination),
      users: [...users, ...data],
    }));
  } catch (error) {
    yield put(getUsersError());
  }
}


export default function* rootSaga() {
  yield all([
    fork(watchGetUsers),
  ]);
}
