import {COMMON} from '../../constants/common';

const initialState = {
  lang: '',
  activeMenu: 'content',
  activeSystemMenu: 'role',
  activeStatisticsMenu: 'StatisticsOwnMedia',
  activeMailMagazineMenu: 'MailGroup',
  globalSearchText: '',
  content: '',
  rawMaterial: '',
  contentFilterData: {},
  articlePreviewData: null
};

export default function commonReducer(state = initialState, action) {
  switch (action.type) {
    case COMMON.TEST_CONST.MAIN:
      return {
        ...state
      };
    case COMMON.SET_LANGUAGE.MAIN:
      return {
        ...state,
        lang: action.params
      };
    case COMMON.SET_MENU.MAIN:
      return {
        ...state,
        activeMenu: (action && action.params) || 'content'
      };
    case COMMON.SYSTEM_SETTINGS_MENU.MAIN:
      return {
        ...state,
        activeSystemMenu: action.params
      };
    case COMMON.STATISTICS_MENU.MAIN:
      return {
        ...state,
        activeStatisticsMenu: action.params
      };
    case COMMON.MAIL_MAGAZINE_MENU.MAIN:
      return {
        ...state,
        activeMailMagazineMenu: action.params
      };
    case COMMON.GLOBAL_SEARCH_TEXT.MAIN:
      return {
        ...state,
        globalSearchText: action.params
      };
    case COMMON.FIELD_INITIALIZER:
      return {
        ...state,
        ...action.body
      };
    case COMMON.ARTICLE_PREVIEW.MAIN:
      return {
        ...state,
        articlePreviewData: {...action.content}
      };
    default:
      return state;
  }
}
