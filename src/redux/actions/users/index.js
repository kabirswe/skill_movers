import USERS from '../../constants/users';

export function userInvitationSetRoleName(body) {
  return {
    type: USERS.SET_ROLE_NAME,
    body
  };
}
export function userInvitationSetRoleValue(body) {
  return {
    type: USERS.SET_ROLE_VALUE,
    body
  };
}
