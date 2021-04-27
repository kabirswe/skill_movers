import {takeLatest, put, call} from 'redux-saga/effects';
import Logger from '../../../helper/logger';
import AxiosServices from '../../../networks/AxiosService';
import ApiServices from '../../../networks/ApiServices';
import {COMMON} from '../../constants/common';

function* testMethod(actions) {
  try {
    const result = yield call(
      AxiosServices.get,
      ApiServices.TEST_API,
      actions.params,
      true
    ); // true when Json Server
    yield put({type: COMMON.TEST_CONST.SUCCESS, result: result.data});
  } catch (err) {
    Logger(err);
    yield put({type: COMMON.TEST_CONST.FAILURE, error: '何かがうまくいかなかった'});
  }
}

export default function* commonSaga() {
  yield takeLatest(COMMON.TEST_CONST.MAIN, testMethod);
}
