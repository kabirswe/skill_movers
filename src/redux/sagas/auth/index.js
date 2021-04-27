import {takeLatest, put, call, takeEvery} from 'redux-saga/effects';
import Logger from '../../../helper/logger';
import AxiosServices from '../../../networks/AxiosService';
import ApiServices from '../../../networks/ApiServices';
import ResponseCode from '../../../networks/ResponseCode';
import {AUTH} from '../../constants/auth';
// import getErrorMessage from '../../../app-constants/ServerErrorInfo';

function* fetchLoginApi(actions) {
  try {
    const response = yield call(
      AxiosServices.post,
      ApiServices.AUTH_LOGIN,
      actions.body,
      false
    ); // true when Json Server
    if (response.status === ResponseCode.OK) {
      const {access_token, id, username, role_permissions = {}} = response.data.data;
      if (access_token) {
        const permissions = new Set();
        const roles = role_permissions.roles || [];
        roles.forEach((r) => {
          r.permissions.forEach((p) => {
            permissions.add(p.display_name);
          });
        });
        localStorage.setItem('accessToken', JSON.stringify(access_token));
        localStorage.setItem('currentUserID', id);
        let userName;
        if (username === null) {
          userName = '';
        } else {
          userName = username;
        }
        localStorage.setItem('currentUserName', userName);
        yield put({type: AUTH.CALL_LOGIN_API.SUCCESS, result: {loginData: response.data.data, permissions: [...permissions]}});
        yield put({type: AUTH.ROUTE_PREPARED.SUCCESS, flag: true})
      } else {
        yield put({type: AUTH.CALL_LOGIN_API.FAILURE, error: response.data.data});
      }
    }
  } catch (err) {
    Logger(err);
    if (err) {
      // const errorMessage = getErrorMessage(err); // err.response.data.data
      yield put({type: AUTH.CALL_LOGIN_API.FAILURE, error: errorMessage});
    }
  }
}

function* updateUserName(actions) {
  yield put({type: AUTH.UPDATE_USERNAME.SUCCESS, result: actions.userName});
}


function* routePrepared(actions) {
  yield put({type: AUTH.ROUTE_PREPARED.SUCCESS, result: actions.flag});
}


function* getPermissions(actions) {
  const response = yield call(
    AxiosServices.get,
    ApiServices.GET_PERMISSIONS,
    false
  ); // true when Json Server

  if (response.status === ResponseCode.OK) {
    let data = response.data.data.list
    const permissions = new Set();
    const roles = data.roles || [];
    roles.forEach((r) => {
      r.permissions.forEach((p) => {
        permissions.add(p.display_name);
      });
    });

    yield put({type: AUTH.GET_PERMISSIONS.SUCCESS, result: [...permissions]});
  }

}


export default function* authSaga() {
  yield takeLatest(AUTH.CALL_LOGIN_API.MAIN, fetchLoginApi);
  yield takeEvery(AUTH.UPDATE_USERNAME.MAIN, updateUserName);
  yield takeLatest(AUTH.ROUTE_PREPARED.MAIN, routePrepared);
  yield takeLatest(AUTH.GET_PERMISSIONS.MAIN, getPermissions);


}
