import { CallStatuses } from '../../constants/callStatuses';
import { CALL_MODAL_STATUS, GET_TWILLIO_CONFIG, GET_TWILLIO_CONFIG_FAIL, GET_TWILLIO_CONFIG_SUCCESS, SET_CALL } from '../actions';

const INIT_STATE = {
  modalOpen: false,
  call: {
    id: null,
    callerId: null,
    calleeId: null,
    status: CallStatuses.PENDING,
  },
  config: []
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case CALL_MODAL_STATUS:
      return { ...state, modalOpen: payload, };
    case SET_CALL:
      return { ...state, call: payload, };
    case GET_TWILLIO_CONFIG:
      return { ...state };
    case GET_TWILLIO_CONFIG_SUCCESS:
      return { ...state, config: payload };
    case GET_TWILLIO_CONFIG_FAIL:
      return { ...state, config: [] };
    default: return { ...state };
  }
}
