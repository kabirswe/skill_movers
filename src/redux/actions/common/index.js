import {COMMON, LOGOUT_REQUEST} from '../../constants/common';

// eslint-disable-next-line import/prefer-default-export
export function setLanguage(params) {
  return {
    type: COMMON.SET_LANGUAGE.MAIN,
    params
  };
}
export function logoutWithRemoveStore() {
  return {
    type: LOGOUT_REQUEST
  };
}

export function setMenu(params) {
  return {
    type: COMMON.SET_MENU.MAIN,
    params
  };
}
export function setSystemSettingsMenu(params) {
  return {
    type: COMMON.SYSTEM_SETTINGS_MENU.MAIN,
    params
  };
}
export function setMailMagazineMenu(params) {
  return {
    type: COMMON.MAIL_MAGAZINE_MENU.MAIN,
    params
  };
}
export function setStatisticsMenu(params) {
  return {
    type: COMMON.STATISTICS_MENU.MAIN,
    params
  };
}
export function setGlobalSearchText(params) {
  return {
    type: COMMON.GLOBAL_SEARCH_TEXT.MAIN,
    params
  };
}

export function fieldInitialization(body) {
  return {
    type: COMMON.FIELD_INITIALIZER,
    body
  };
}

export function setPreviewArticleData(content) {
  return {
    type: COMMON.ARTICLE_PREVIEW.MAIN,
    content
  };
}
