import {AUTH} from '../../constants/auth';

export const initialState = {
  loginInput: '',
  apiError: '',
  loggedInUserId: '',
  isRoutePrepared: false,
  loginData: {},
  permissions: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH.FIELD_INITIALIZATION:
      return {
        ...state,
        ...action.body
      };
    case AUTH.CALL_LOGIN_API.SUCCESS:
      return {
        ...state,
        apiError: '',
        loginData: action.result && action.result.loginData,
        permissions: action.result && action.result.permissions
      };
    case AUTH.CALL_LOGIN_API.FAILURE:
      return {
        ...state,
        apiError: action.error
      };
      case AUTH.CLEAR_LOGIN_DATA.SUCCESS:
        console.log('************************ clearing login data')
      return {
        ...state,
        loginData: {}
      };
    case AUTH.ROUTE_PREPARED.SUCCESS:
    return {
      ...state,
      isRoutePrepared: action.flag 
    };
    case AUTH.GET_PERMISSIONS.SUCCESS:
      return {
        ...state,
        permissions: action.result
      };
    case AUTH.UPDATE_USERNAME.SUCCESS:
      let loginData = state.loginData;
      loginData.username = action.result;
      return {
        ...state,
        loginData: {...loginData}
      };
    default:
      return state;
  }
}
