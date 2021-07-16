import { CallStatuses } from '../../constants/callStatuses';
import { CALL_MODAL_STATUS, SET_CALL } from '../actions';

const INIT_STATE = {
  modalOpen: false,
  call: {
    id: null,
    callerId: null,
    calleeId: null,
    status: CallStatuses.PENDING,
  },
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case CALL_MODAL_STATUS:
      return { ...state, modalOpen: payload, };
    case SET_CALL:
      return { ...state, call: payload, };
    default: return { ...state };
  }
}
