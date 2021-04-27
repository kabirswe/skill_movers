import {validatePassword as checkPassword} from './index';
import {translator} from '../localizations';
export function validateUsername(username, formData = {}, errors = {}) {
  // also valid if contains "-", "_"
  // min length 1 and max length 100
  const regexp = /^[a-zA-Z0-9-_]{2,100}$/;
  if (username.search(regexp) === -1) {
    errors.username = 'Username should contain alphanumeric, hyphen, underscore';
    formData.username = '';
  } else {
    errors.username = '';
    formData.username = username;
  }
}

export function validateFullname(fullname, formData = {}, errors = {}) {
  if (fullname.length < 8) {
    // errors.fullname = 'Fullname must be 8 characters long!';
    errors.fullname = ''; // fullname not required field
    formData.fullname = '';
  } else {
    errors.fullname = '';
    formData.fullname = fullname;
  }
}

export function validatePassword(password, formData = {}, errors = {}) {
  if(password.length < 8 || password.length > 32){
    errors.password = translator('REGISTRATION.PASSWORD_LENGTH_ERROR');
    formData.password = '';
    return false;
  }
  let passwordStrength = checkPassword(password);
  if (['strong', 'good', 'weak', 'invalid'].indexOf(passwordStrength) !== 1) {
    errors.password = '';
    formData.password = password;
  }
}

export function validatePasswordConfirmation(
  password_confirmation,
  formData = {},
  errors = {}
) {
  if (password_confirmation !== formData.password) {
    errors.password_confirmation = 'Password must be matched!';
    formData.password_confirmation = '';
  } else {
    errors.password_confirmation = '';
    formData.password_confirmation = password_confirmation;
  }
}

export function validateForm(errors) {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
}

export function modifyArray(data) {
  const newArr = data.map((v) => ({...v, isChecked: false}));
  return newArr;
}

export function hasNumber(str) {
  return /\d/.test(str);
}
