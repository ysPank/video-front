import { all, call, fork, put, takeEvery, select, take } from "redux-saga/effects";

import { getUsersError, getUsersSuccess } from "./actions";
import { GET_USERS } from "../actions";
import { getUserList } from "../../api";
import { updatePaginationState } from "../../helpers/pagination";
import { createUsersChannel } from "../../api/socket";

const paginationGetter = state => state.users;

export function* watchGetUsers() {
  yield takeEvery(GET_USERS, getUsers);
}

const getUsersAsync = (params) => async () => {
  return getUserList(params);
};

function* getUsers() {
  const { offset, users } = yield select(paginationGetter);

  try {
    const { data, pagination } = yield call(getUsersAsync({ offset }));
    yield put(getUsersSuccess({
      pagination: updatePaginationState({ pagination, users: [...users, ...data] }),

    }));
  } catch (error) {
    yield put(getUsersError());
  }
}


export function * watchUsersChannel() {
  const channel = yield call(createUsersChannel);

  while (true) {
    const a = yield take(channel);

    const action = console.log
    console.log(a, 'from channel saga')

    yield put(getUsersError);
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchGetUsers),
    fork(watchUsersChannel),
  ]);
}
