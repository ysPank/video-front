import { combineReducers } from 'redux';

import users from './users/reducer';
import calls from './calls/reducer';

const reducers = combineReducers({
  users,
  calls,
});

export default reducers;
