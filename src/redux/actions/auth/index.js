import {AUTH} from '../../constants/auth';

export function loginApi(body) {
  return {
    type: AUTH.CALL_LOGIN_API.MAIN,
    body
  };
}
export function fieldInitialization(body) {
  return {
    type: AUTH.FIELD_INITIALIZATION,
    body
  };
}

export function updateUserName(userName) {
  return {
    type: AUTH.UPDATE_USERNAME.MAIN,
    userName
  };
}

export function routePrepare(flag) {
  return {
    type: AUTH.ROUTE_PREPARED.MAIN,
    flag
  };
}

export function getPermissions(permissions) {
  return {
    type: AUTH.GET_PERMISSIONS.MAIN,
    permissions
  };
}

export function clearLoginData() {
  return {
    type: AUTH.CLEAR_LOGIN_DATA.SUCCESS,
    
  };
}