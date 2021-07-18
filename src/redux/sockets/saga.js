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
import reactHistory from '../../helpers/history';

export function* watchSocketsChannel() {
  const channel = yield call(createUsersChannel);

  while (true) {
    const { event, data } = yield take(channel);
    const me = yield (select(state => state.users.me));
    let users;

    switch (event) {
      case SocketEvents.CUSTOM_ERROR:
        toast.error(data, toastConfig);
        break;
      case SocketEvents.MY_DATA:
        setToUserStorage(data.name);
        yield put(updateMe(data));
        break;
      case SocketEvents.REQUESTED_CALL:
        yield put(setCall(data));
        if (me.id !== data.caller.id) {
          yield put(setModal(true));
        }
        break;
      case SocketEvents.DECLINED_CALL:
        const declinedCall = yield (select(state => state.calls.call));
        yield put(setCall({ ...declinedCall, status: CallStatuses.CANCELED }));
        yield put(setModal(false));

        reactHistory.replace('/')

        toast.error('Call has been canceled by other user.', toastConfig);
        break;
      case SocketEvents.ACCEPTED_CALL:
        const ongoingCall = yield (select(state => state.calls.call));

        yield put(setCall({ ...ongoingCall, status: CallStatuses.APPROVED }));
        yield put(setModal(false));

        reactHistory.push('/call')
        break;
      case SocketEvents.USER_JOINED:
        users = yield (select(state => state.users.users));
        yield put(getUsersSuccess({ users: [data, ...users] }));
        break;
      case SocketEvents.USER_UPDATED:
        if (data.id !== me.id) {
          users = yield (select(state => state.users.users));

          yield put(getUsersSuccess({
            users: immutableUpdateByIndex(
              users,
              users.findIndex(({ id }) => id === data.id),
              data,
            )
          }));
          ;
        }
        break;
      case SocketEvents.USER_LEFT:
        users = yield (select(state => state.users.users));
        yield put(getUsersSuccess({ users: immutableSplice(users, users.findIndex(({ id }) => id === data)) }));
        break;
      default:
        break;
    }
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchSocketsChannel),
  ]);
}
