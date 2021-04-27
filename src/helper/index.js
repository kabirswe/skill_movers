import PasswordStrength from '@fnando/password_strength';
import {convertToRaw, convertFromRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {format} from 'date-fns/esm';
import locale from 'date-fns/locale/ja';
import {translator} from '../localizations';
import {editMod, approveMod, prohibitMod, articlePermissions} from '../app-constants';


export function isLoggedIn() {
  let isLogin = false;
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    isLogin = true;
  }
  return isLogin;
}
export function getPermittedMenu() {
  return JSON.parse(localStorage.getItem('accessMenu'));
}

export function validateEmail(mail) {
  const reg = /[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+|[々〆〤]+/u;
  // const emailReg = /^\w+([!#$%&-‘*+–/=?^_`.{|}~\]\w+]?)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailReg.test(mail) && !reg.test(mail)) {
    return true;
  }
  return false;
}

export function validatePassword(password) {
  if ((password.length < 8 || password.length > 32) && password.length) {
    const passwordLengthError = translator('REGISTRATION.PASSWORD_LENGTH_ERROR');
    return passwordLengthError;
  }

  const japaneseReg = /[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+|[々〆〤]+/u;
  if (japaneseReg.test(password) || password.length < 8) {
    return false;
  }
  const strength = PasswordStrength.test('johndoe', password);
  return strength.status;
}

export function isJapaneseText(string) {
  const reg = /[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+|[々〆〤]+/u;
  reg.test(string);
}

export function isObjectEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
export function isEmpty(object) {
  return Object.keys(object).length === 0;
}

export function generateKey() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}
export function getObjectFromArrComparedById(arr, id) {
  let obj = {};
  obj = arr.find((item) => item.id === id);
  return obj;
}
export function getIsPublishedById(id) {
  let name = '非公開中';
  if (id === 0) {
    name = '非公開中';
  }
  if (id === 1) {
    name = '公開中';
  }
  if (id === 2) {
    name = '公開待ち';
  }
  return name;
}

export function fullWidthJpAlphaNumeric(string = '') {
  const reg = /^[ぁ-んァ-ン一-龥０-９]+$/;
  return reg.test(string);
}

export const zeroPadding = (size = '') => {
  const s = size.toString().split('');
  if (s.length === 1) {
    return `0${size}`;
  }
  return size;
};

export function getIsUploadedById(id) {
  let name = '未アップロード';
  if (id === 0) {
    name = '未アップロード';
  }
  if (id === 1) {
    name = 'アップロード済み';
  }
  return name;
}
export function getRequiredVal(dataArr, selectObj, index = 0) {
  if (!!selectObj) {
    return selectObj.value;
  }
  if (!!dataArr) {
    return dataArr[index].value;
  }
  return '';
}
export function getObjectFromArrComparedByAttr(arr, param, attr = 'value') {
  let obj = {};
  obj = arr.find((item) => item[attr] === param);
  return obj;
}
// trim function to truncate words
const CHARLEN = 26;
export function trim(str = '', len = CHARLEN) {
  if (str && str.length > len) {
    return `${str.slice(0, len)}...`;
  }
  return str;
}

export function getCursorXY(input, selectionPoint) {
  const {offsetLeft: inputX, offsetTop: inputY} = input;
  // create a dummy element that will be a clone of our input
  const div = document.createElement('div');
  // get the computed style of the input and clone it onto the dummy element
  const copyStyle = getComputedStyle(input);
  for (const prop of copyStyle) {
    div.style[prop] = copyStyle[prop];
  }
  // we need a character that will replace whitespace when filling our dummy element if it's a single line <input/>
  const swap = '.';
  const inputValue =
    input.tagName === 'INPUT' ? input.value.replace(/ /g, swap) : input.value;
  // set the div content to that of the textarea up until selection
  const textContent = inputValue.substr(0, selectionPoint);
  // set the text content of the dummy element div
  div.textContent = textContent;
  if (input.tagName === 'TEXTAREA') div.style.height = 'auto';
  // if a single line input then the div needs to be single line and not break out like a text area
  if (input.tagName === 'INPUT') div.style.width = 'auto';
  // create a marker element to obtain caret position
  const span = document.createElement('span');
  // give the span the textContent of remaining content so that the recreated dummy element is as close as possible
  span.textContent = inputValue.substr(selectionPoint) || '.';
  // append the span marker to the div
  div.appendChild(span);
  // append the dummy element to the body
  document.body.appendChild(div);
  // get the marker position, this is the caret position top and left relative to the input
  const {offsetLeft: spanX, offsetTop: spanY} = span;
  // lastly, remove that dummy element
  // NOTE:: can comment this out for debugging purposes if you want to see where that span is rendered
  document.body.removeChild(div);
  // return an object with the x and y of the caret. account for input positioning so that you don't need to wrap the input
  return {
    x: inputX + spanX,
    y: inputY + spanY
  };
}

export function modifyMemberData(data) {
  const newArr = data.map((v) => ({
    ...v,
    invitation_status:
      v.invitation_status === 1
        ? translator('INVITATION_STATUS.SENT')
        : v.invitation_status === 2
        ? translator('INVITATION_STATUS.ACCEPTED')
        : translator('INVITATION_STATUS.NOT_YET')
  }));
  return newArr;
}

// borrowed from https://gist.github.com/Yimiprod/7ee176597fef230d1451
// comment author "Aschen" (search by "Aschen to reach this code section in above link")
export function objectChanges(base, object) {
  const changes = {};

  function walkObject(base, object, path = '') {
    for (const key of Object.keys(base)) {
      const currentPath = path === '' ? key : `${path}.${key}`;

      if (object[key] === undefined) {
        changes[currentPath] = '-';
      }
    }

    for (const [key, value] of Object.entries(object)) {
      const currentPath = Array.isArray(object)
        ? `${path}[${key}]`
        : path === ''
        ? key
        : `${path}.${key}`;

      if (base[key] === undefined) {
        changes[currentPath] = '+';
      } else if (value !== base[key]) {
        if (typeof value === 'object' && typeof base[key] === 'object') {
          walkObject(base[key], value, currentPath);
        } else {
          changes[currentPath] = object[key];
        }
      }
    }
  }

  walkObject(base, object);

  return changes;
}

export function detectChanges(state) {
  const {
    baseArticle,
    article,
    prevEditorHtml,
    currentEditorHtml,
    commentText,
    prevEditorState,
    editorState
  } = state;
  let isChanged = false;

  let {html: prevHtml, text: prevText} = editorContentAsText(prevEditorState)
  let {html, text} = editorContentAsText(editorState)


  if(text && ((prevText !== text) || (prevHtml !== html))) {
    isChanged = true
    console.log('changed editor text', prevText)
    console.log('changed editor html', prevHtml)
    console.log("*************************************")
    console.log('changed editor curretn text', text)
    console.log('changed editor current html', html)

  }

  if (baseArticle.title !== article.title) {
    console.log('changed title', baseArticle.title, article.title);

    isChanged = true;
  }
  if (baseArticle.url !== article.url) {
    console.log('changed url', baseArticle.url, article.url);

    isChanged = true;
  }
  if (baseArticle.description !== article.description) {
    console.log('changed description', baseArticle.description, article.description);

    isChanged = true;
  }

  if (baseArticle.startDate !== article.startDate) {
    console.log('changed startDate', baseArticle.startDate, article.startDate);

    isChanged = true;
  }

  if (baseArticle.endDate !== article.endDate) {
    console.log('changed endDate', baseArticle.endDate, article.endDate);

    isChanged = true;
  }

  if (
    JSON.stringify(baseArticle.managementTags) !==
    JSON.stringify(article.managementTags)
  ) {
    console.log('changed managementTags', baseArticle.managementTags, article.managementTags);

    isChanged = true;
  }

  // edit tab
  const baseEdit = baseArticle.editTab || {};
  const artEdit = article.editTab || {};

  if (JSON.stringify(baseEdit.category) !== JSON.stringify(artEdit.category)) {
    console.log('changed category', baseEdit.category, artEdit.category);

    isChanged = true;
  }

  if (JSON.stringify(baseEdit.seoTags) !== JSON.stringify(artEdit.seoTags)) {
    console.log('changed seoTags', baseEdit.seoTags, artEdit.seoTags);

    isChanged = true;
  }

  if (Number(baseEdit.articleLayout) !== Number(artEdit.articleLayout)) {
    console.log('changed articleLayout', baseEdit.articleLayout, Number(artEdit.articleLayout));

    isChanged = true;
  }
  if (Number(baseEdit.publishingType) !== Number(artEdit.publishingType)) {
    console.log('changed publishingType', baseEdit.publishingType, Number(artEdit.publishingType));

    isChanged = true;
  }

  return isChanged;
}

export function detectManageMentTabChanges(state) {
  const {baseArticle, article, commentText} = state;
  let isChanged = false;

  console.log('change detection called');
  // management tabs
  const baseMan = baseArticle.manageMentTab;
  const artMan = article.manageMentTab;

  if (baseMan.reviewRequest !== artMan.reviewRequest) {
    console.log('changed reviewRequest', baseMan.reviewRequest, artMan.reviewRequest);
    isChanged = true;
  }

  if (baseMan.approvalRequest !== artMan.approvalRequest) {
    console.log('changed approvalRequest', baseMan.approvalRequest, artMan.approvalRequest);
    isChanged = true;
  }

  if (baseMan.approvalConfirmation !== artMan.approvalConfirmation) {
    console.log(
      'changed  approvalConfirmation',
      baseMan.approvalConfirmation,
      artMan.approvalConfirmation
    );

    isChanged = true;
  }

  if (baseMan.approvalCancelation !== artMan.approvalCancelation) {
    console.log('changed approvalCancelation', baseMan.approvalCancelation, artMan.approvalCancelation);

    isChanged = true;
  }

  if (baseMan.reviewConfirmation !== artMan.reviewConfirmation) {
    console.log('changed reviewConfirmation', baseMan.reviewConfirmation, artMan.reviewConfirmation);

    isChanged = true;
  }

  if (baseMan.prohibition !== artMan.prohibition) {
    console.log('changed prohibition', baseMan.prohibition, artMan.prohibition);
    isChanged = true;
  }

  return isChanged;
}

export function checkEditModePermission(name, userPermissions = []) {

  let perm = userPermissions || []
  const allowedPermission = editMod[name] || [];
  return perm.find((p) => allowedPermission.includes(p));
}

export function checkApproveModePermission(name, userPermissions = []) {

  let perm = userPermissions || []
  const allowedPermission = approveMod[name] || [];
  return perm.find((p) => allowedPermission.includes(p));
}

export function checkProhibitModePermission(name, userPermissions = []) {

  let perm = userPermissions || []
  const allowedPermission = prohibitMod[name] || [];
  return perm.find((p) => allowedPermission.includes(p));
}

export function checkPageAccess (userPermissions=[]) {
  let perm = userPermissions || []
  return perm.find((p) => articlePermissions.includes(p));
}

export function getFieldStatus(val = '') {
  let status = false;
  if (val === 1) {
    status = true;
  }
  return status;
}

export function isValidTitle(string) {
  const reg = /[<>]/g;
  return reg.test(string);
}

export function formatScheduleDateWithLang(date) {
  return format(date, 'yyyy.MM.dd kk:mm (E)', {locale: locale});
}

export function editorContentAsText (editorState) {
  if (!editorState) {
    return {
      html: '',
      text: ''
    }
  }
  const rawContentState = editorState && convertToRaw(editorState.getCurrentContent());
  const contentState = editorState.getCurrentContent()
  const textContent = contentState.getPlainText()
  const markup = draftToHtml(
    rawContentState
  );
  return {
    html: markup,
    text: textContent
  }
}



export function getTargetedCityTime (tz) {
  let d = new Date()
  // get the local time
  let localTime = d.getTime();
  // get the local time offset
  let localOffset = d.getTimezoneOffset() * 60000;
  // make the utc time
  let utc = localTime + localOffset;
  // offset time of target city in hours. in this case tokoy
  let offset = tz || 9;
  // build the targeted city time in milisecond
  let tokyo = utc + (3600000*offset);
  // targeted time
  let targetedTime = new Date(tokyo);
  return targetedTime
}



export function isDoubleByteCharacter(s) {
  return /[^\u0000-\u00ff]/.test(s);
}
