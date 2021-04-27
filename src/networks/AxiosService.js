import axios from 'axios';
import config from '../config';

function getIRequestProp(severType, isMultipart) {
  const serverUrl = severType ? config.JSON_API_URL : config.API_URL;
  const token = JSON.parse(localStorage.getItem('accessToken'));

  return {
    serverUrl: serverUrl,
    requestHeader: {
      'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
      'Accept-Language': config.DEFAULT_LANGUAGE,
      Authorization: `Bearer ${token}`
    }
  };
}
async function get(url, parameter, isJsonServer) {
  const {serverUrl, requestHeader} = getIRequestProp(isJsonServer);
  return axios.get(serverUrl + url, {
    params: parameter,
    headers: requestHeader
  });
}
async function getGoogleAPI(url) {
  return axios.get(url);
}
async function post(url, body, isJsonServer, isMultipart) {
  const {serverUrl, requestHeader} = getIRequestProp(isJsonServer, isMultipart);
  return axios.post(serverUrl + url, body, {
    headers: requestHeader
  });
}
async function put(url, body, isJsonServer) {
  const {serverUrl, requestHeader} = getIRequestProp(isJsonServer);
  return axios.put(serverUrl + url, body, {
    headers: requestHeader
  });
}
async function patch(url, body, isJsonServer) {
  const {serverUrl, requestHeader} = getIRequestProp(isJsonServer);
  return axios.patch(serverUrl + url, body, {
    headers: requestHeader
  });
}
async function remove(url, body, isJsonServer) {
  const {serverUrl, requestHeader} = getIRequestProp(isJsonServer);
  return axios.delete(serverUrl + url, {
    data: body,
    headers: requestHeader
  });
}
const AxiosServices = {
  get,
  post,
  put,
  patch,
  remove,
  getGoogleAPI
};
export default AxiosServices;
