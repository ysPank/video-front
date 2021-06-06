import { combineReducers } from 'redux';

import users from './users/reducer';

const reducers = combineReducers({
  users,
});

export default reducers;
