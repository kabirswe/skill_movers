import {translator} from '../localizations';
import * as ResponseCode from '../networks/ResponseCode';

/**
 * Error message processor
 *
 * @param errorResponse
 * @return {{message: string}}
 */
export default function getErrorMessage(errorResponse) {
  console.log('ErrorResponse', errorResponse.response);
  const response = {message: translator('ERROR_API.SERVER_NOT_ACCESS')};
  const {status, data, statusText} = errorResponse.response || {};
  const errorMessage = data ? data.message || statusText : statusText;

  if (
    (status === ResponseCode.INTERNAL_SERVER_ERROR ||
      status === ResponseCode.UNPROCESSABLE_ENTITY) &&
    !!data.error
  ) {
    response.message = errorMessage;
  }
  if (status <= 422) {
    if (data.message) {
      response.message = data.message;
    }
    if (data.errors) {
      response.errors = data.errors;
    }
    if (data.error) {
      response.errors = data.error;
    }
  }

  return response;
}
