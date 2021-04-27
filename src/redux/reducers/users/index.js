import USERS from '../../constants/users';

export const initialState = {
  rolesName: '',
  rolesValue: []
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case USERS.SET_ROLE_NAME:
      return {
        ...state,
        rolesName: action.body
      };
    case USERS.SET_ROLE_VALUE:
      return {
        ...state,
        rolesValue: action.body
      };
    default:
      return state;
  }
}
