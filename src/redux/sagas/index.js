import {all} from 'redux-saga/effects';
import commonSaga from './common';
import authSaga from './auth';
import videoSaga from './video';
import memberSaga from './member';

function* rootSaga() {
  yield all([commonSaga(), authSaga(), videoSaga(), memberSaga()]);
}

export default rootSaga;
