import {translator} from '../localizations';

export function hasErrorInput(errors, dataError, errorField) {
  let hasError = false;
  if (!!errors) {
    if (errorField in errors) {
      hasError = !!errors[errorField];
    }
  }
  if (!!dataError && dataError[errorField]) {
    hasError = !!dataError[errorField];
  }

  return hasError;
}

export default function getErrorMsg(dataErrorMassage = '', errorField = '') {
  let msg = translator('REQUIRED.MESSAGE');
  if (!!dataErrorMassage) {
    msg = dataErrorMassage;
  }
  if (!!errorField) {
    msg = errorField;
  }
  return msg;
}
