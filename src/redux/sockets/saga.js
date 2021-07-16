import { all, call, fork, put, select, take } from "redux-saga/effects";
import { toast } from 'react-toastify';

import { getUsersSuccess, updateMe } from "../users/actions";
import { createUsersChannel } from "../../api/socket";
import { SocketEvents } from '../../constants/socketEvents';
import { immutableSplice, immutableUpdateByIndex } from '../../helpers/immutable';
import { setCall, setModal } from '../calls/actions';
import { CallStatuses } from '../../constants/callStatuses';
import { toastConfig } from '../../constants/toastConfig';
import { setToUserStorage } from '../../helpers/storage';

const handleUserSocketEvents = (event, data, users) => {
  switch (event) {
    case SocketEvents.USER_JOINED:
      return [data, ...users];
    case SocketEvents.USER_LEFT:
      return immutableSplice(users, users.findIndex(({ id }) => id === data));
    case SocketEvents.USER_UPDATED:
      return immutableUpdateByIndex(
        users,
        users.findIndex(({ id }) => id === data.id),
        data,
      );
    default: return;
  }
}

export function* watchSocketsChannel() {
  const channel = yield call(createUsersChannel);

  while (true) {
    const { event, data } = yield take(channel);
    const me = yield (select(state => state.users.me));

    if (event === SocketEvents.MY_DATA) {
      setToUserStorage(data.name);
      yield put(updateMe(data));
    } else if (event === SocketEvents.REQUESTED_CALL) {
      yield put(setCall(data));
      if (me.id !== data.caller.id) {
        yield put(setModal(true));
      }
    } else if (event === SocketEvents.DECLINED_CALL) {
      const declinedCall = yield (select(state => state.calls.call));
      yield put(setCall({ ...declinedCall, status: CallStatuses.CANCELED }));
      yield put(setModal(false));

      toast.error('Call has been canceled by other user.', toastConfig);
    } else if (event === SocketEvents.ACCEPTED_CALL) {
      const call = yield (select(state => state.calls.call));
      yield put(setCall({ ...call, status: CallStatuses.APPROVED }));
    }

    if (event === SocketEvents.USER_UPDATED && data.id === me.id) {
      // yield put(updateMe({ users: updatedList }));
    } else if ([SocketEvents.USER_JOINED, SocketEvents.USER_LEFT, SocketEvents.USER_UPDATED].includes(event)) {
      /* update user in call if user updated */
      const users = yield (select(state => state.users.users));
      const updatedList = handleUserSocketEvents(event, data, users);

      if (updatedList) {
        yield put(getUsersSuccess({ users: updatedList }));
      }
    }
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchSocketsChannel),
  ]);
}
