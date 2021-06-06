import { DEFAULT_LIMIT } from '../../constants';
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
} from '../actions';

const INIT_STATE = {
  users: [],
  isLoading: false,
  me: null,
  pagination: {
    limit: DEFAULT_LIMIT,
    offset: 0,
    totalCount: null,
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, isLoading: true, };
    case GET_USERS_SUCCESS:
      return { ...state, isLoading: false, users: action.payload };
    case GET_USERS_ERROR:
      return { ...state, isLoading: false, };
    default: return { ...state };
  }
}
