import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';
import commonReducer from './common';
// import toast from './toast';
import authReducer from './auth';
import usersReducer from './users';
// import videoReducer from './video';
// import memberReducer from './member';
import {LOGOUT_REQUEST} from '../constants/common';

const appReducer = combineReducers({
  commonReducer,
  // toast,
  authReducer,
  usersReducer,
  // videoReducer,
  // memberReducer
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_REQUEST) {
    storage.removeItem('persist:root');
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
