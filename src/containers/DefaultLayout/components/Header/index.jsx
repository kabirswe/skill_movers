import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import AxiosService from '../../../../networks/AxiosService';
import ApiService from '../../../../networks/ApiServices';
import HeaderStyle from './header.module.scss';
import {routes} from '../../../../app-constants';
import debounce from 'lodash/debounce'
import {trim, isDoubleByteCharacter} from '../../../../helper';

import {clearLoginData} from '../../../../redux/actions/auth'

import {
  logoutWithRemoveStore,
  setMenu,
  setGlobalSearchText,
  fieldInitialization
} from '../../../../redux/actions/common';
import {
  CloudUploadSharp,
  Notifications,
  WiDayCloudy,
  SearchOutline
} from '../../../../assets/svgComp';
import NcDropdown from '../NcDropDown';
import path from '../../../../routes/path';
import {MENUS} from '../../../../app-constants/menuContent';
// import UploadModal from '../../../../modules/RawMaterial/components/UploadModal';

class Header extends Component {
  constructor(props) {
    super(props);
    this.commentId = 1;
    this.routes = routes;
    this.state = {
      isOpen: false,
      isNotificationOpen: false,
      value: '',
      showUpload: false,
      notificationCount: 0,
      notifications: [],
      globalSearchText: this.getTextValue()
    };
    this.menus = [
      {
        name: 'profile',
        displayName: 'PROFILE'
      },
      {
        name: 'logout',
        displayName: 'LOGOUT'
      }
    ];
  }

  toggle = () =>
    this.setState({
      isOpen: !this.state.isOpen
    });

  toggleNotification = () => {
    this.setState({
      isNotificationOpen: !this.state.isNotificationOpen
    });
    setTimeout(() => {
      this.setState({
        notificationCount: 0
      });
    }, 200);
    this.readNotification();
  };

  handleClick = (value) => {
    if (value === 'profile') {
      this.props.history.push(path.profile);
      localStorage.setItem('activeMenu', 'profile');
      this.props.setMenu('profile');
      return;
    }
    if (value === 'logout') {
      if (this.props.detectArticleChange && this.props.detectArticleChange()) {
        window.location.reload();
        return;
      }

      localStorage.removeItem('accessToken');
      localStorage.removeItem('currentUserID');
      localStorage.removeItem('currentUserName');
      localStorage.removeItem('activeMenu');
      localStorage.removeItem('permissions');
      localStorage.setItem("nc-logout-event", Math.random())
      this.props.clearLoginData()
      this.props.logoutWithRemoveStore();
      this.props.history.push(path.login);
      window.location.reload();
      return;
    }
    this.setState({
      value
    });
  };

  showActiveMenu = (menu = '') => {
    if (!menu === 'profile') {
      const menuName = MENUS.find((obj) => obj.key === menu);
      return menuName.pageTitle;
    }
    return menu.toUpperCase();
  };

  componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      this.props.history.push('/login');
    }

    AxiosService.get(ApiService.GET_NOTIFICATIONS, false)
      .then((result) => {
        // this.readNotification();
        this.setState({
          notifications: result.data.data.list || [],
          notificationCount: result.data.data.unread_count
        });
      })
      .catch((error) => {
        console.log('here is error', error.response);
      })
      .catch((error) => {
        console.log('here is error', error.response);
      });

    const notificationDialog = document.getElementById('notificationDialog');

    document.addEventListener('click', (event) => {
      const notificationDialog = document.getElementById('notificationDialog');
      const dialogBorder = document.getElementById('dialogBorder');
      const obj = document.getElementById('dialogBorder');
      if (
        notificationDialog &&
        !notificationDialog.contains(event.target) &&
        obj &&
        !obj.contains(event.target)
      ) {
        // outside
        this.setState({isNotificationOpen: false});
      }
    });
  }

  clearNotifications = () => {
    this.setState({
      notifications: []
    });
    this.clearNotification();
  };

  readNotification = () => {
    AxiosService.get(ApiService.READ_NOTIFICATION, false)
      .then((result) => {
        this.setState({
          notificationCount: 0
        });
      })
      .catch((error) => {
        console.log('error ', error.response);
      });
  };

  clearNotification = () => {
    AxiosService.get(ApiService.CLEAR_NOTIFICATION, false)
      .then((result) => {
        this.setState({
          notificationCount: 0
        });
      })
      .catch((error) => {
        console.log('error ', error.response);
      });
  };

  okClick = () => {
    this.props.history.push(path.videoManagement);
  };

  handleChangeSearch = (e) => {
    this.setState({
      globalSearchText: e.target.value
    })
    e.persist();
    if (!this.debouncedFn) {
      this.debouncedFn = debounce(() => {
        const { activeMenu } = this.props;
        if (activeMenu === 'content' || activeMenu === 'raw_material') {
          this.props.setGlobalSearchText(e.target.value);
          this.props.fieldInitialization({
            [activeMenu === 'content' ? activeMenu : 'rawMaterial']: e.target.value
          });
        } else {
          this.props.setGlobalSearchText(e.target.value);
        }
      }, 300);
    }
    this.debouncedFn();
  };

  getTextValue() {
    const {activeMenu, globalSearchText, content, rawMaterial} = this.props;
    if (activeMenu === 'content') {
      return content;
    }
    if (activeMenu === 'raw_material') {
      return rawMaterial;
    }
    return globalSearchText;
  }

  hightlight(text, data) {
    const mentionedUser =
      data.comment_mentions && data.comment_mentions.map((u) => u.user.username);
    const textarr = (text && text.split(' ')) || [];
    const textarrLen = textarr.length;
    const originalText = (data.message && data.message.split(' ')) || [];
    let st = '';
    originalText.forEach((text, index) => {
      if (textarrLen >= index + 1) {
        if (
          (text.includes('@') && mentionedUser.includes(text.replace('@', ''))) ||
          (text.includes('＠') && mentionedUser.includes(text.replace('＠', '')))
        ) {
          st = `${st} <span className=${HeaderStyle.notificationMentioned}>${textarr[index]}</span>`;
          return;
        }
        st = `${st} ${text}`;
      }
    });

    return ReactHtmlParser(st);
  }

  commentTemplate(data = {}) {
    const status = {
      '1': 'NG',
      '2': 'OK'
    };

    const userList =
      data.comment_mentions &&
      data.comment_mentions.map((data) => data.user.username);
    // normal comemnt type= 1
    if (data.comment_type == 1) {
      return (
        <>
          <div className={HeaderStyle.description}>
            <div
              title={data.article_title}
              className={HeaderStyle.notificationTitle}
            >
              {' '}
              {data.article_title}
            </div>
            <div
              title={data.message}
              className={HeaderStyle.notificationDescription}
            >
              {this.hightlight(data.message, data)}{' '}
            </div>
          </div>
        </>
      );
    }
    // review ok or approve ok
    const reviewText = 'がレビュー';

    if (data.comment_type == 2) {
      const st = data.review_status;
      let text = '';
      if (data.is_approve && data.is_review) {
        text = (
          <div>
            <span>{data.created_by_username}さん</span> がレビュー
            <span>{status[st]}</span>, 承認 <span>{status[st]}</span> しました。
          </div>
        );
      } else if (data.is_review) {
        text = (
          <div>
            <span>{data.created_by_username}さん</span> がレビュー
            <span>{status[st]}</span>。
          </div>
        );
      } else {
        text = (
          <div>
            <span>{data.created_by_username}さん</span> 承認{' '}
            <span>{status[data.approval_status]}</span> しました。
          </div>
        );
      }
      return (
        <>
          <div className={HeaderStyle.description}>
            <div
              title={data.article_title}
              className={HeaderStyle.notificationTitle}
            >
              {data.article_title}
            </div>
            {text}
          </div>
        </>
      );
    }
    const reviewRequestText = 'レビュー依頼しました。';
    const approveRequestText = '承認依頼しました。';
    if (data.comment_type == 3) {
      let text = '';
      const [user = {}] = (data.comment_mentions && data.comment_mentions) || [];
      if (data.is_approve) {
        text = (
          <div>
            <span>{data.created_by_username}さんが</span> {approveRequestText}
          </div>
        );
      }
      if (data.is_review) {
        text = (
          <div>
            <span>{data.created_by_username}さんが</span> {reviewRequestText}
          </div>
        );
      }
      return (
        <>
          <div className={HeaderStyle.description}>
            <div
              title={data.article_title}
              className={HeaderStyle.notificationTitle}
            >
              {data.article_title}
            </div>
            {text}
          </div>
        </>
      );
    }
  }

  render() {
    const {
      isOpen,
      notifications,
      isNotificationOpen,
      notificationCount
    } = this.state;
    const {activeMenu, globalSearchText} = this.props;
    const {loggedUser} = this.props;

    return (
      <>
        {/* <UploadModal
          isActive={this.state.showUpload}
          cancelClick={() => this.setState({showUpload: false})}
          okClick={() => this.okClick()}
        /> */}
        <div className={HeaderStyle.mainHeader}>
          <div className={HeaderStyle.mainLogo}>
            <div className={HeaderStyle.logo}>
              <WiDayCloudy className={HeaderStyle.logoSvg} />
              <span className={HeaderStyle.logoText}>NewsCloud</span>
            </div>
          </div>
          <div className={HeaderStyle.topBar}>
            <div className={HeaderStyle.leftSide}>
              <div className={HeaderStyle.headerDropDown}>
                {/* <h5 className={HeaderStyle.currentMenu}>
                  {translator(
                    `SIDE_NAV.MENU_ITEM.${this.showActiveMenu(activeMenu)}`
                  )}
                </h5> */}
              </div>
            </div>
            <div className={HeaderStyle.rightSide}>
              <span>Sprint8-B6</span>
              <div className={HeaderStyle.buttonGroup}>
                {/* <button type="button" className={HeaderStyle.cloudButton}>
                <button
                  type="button"
                  className={HeaderStyle.cloudButton}
                  onClick={() => {
                    this.setState({showUpload: true});
                  }}
                >
                  {translator('HEADER.CLOUD_BUTTON')}
                </button> */}
                <CloudUploadSharp fill="white" className={HeaderStyle.cloudIcon} />
              </div>

              <div className={HeaderStyle.searchGroup}>
                <input
                  type="text"
                  placeholder="検索するキーワードを入力"
                  value={this.state.globalSearchText}
                  className={HeaderStyle.search}
                  onChange={(e) => this.handleChangeSearch(e)}
                />
                <SearchOutline className={HeaderStyle.searchIcon} />
              </div>
              <div
                onClick={this.toggleNotification}
                className={HeaderStyle.notification}
                id="notificationDialog"
              >
                <Notifications
                  className={
                    notificationCount
                      ? HeaderStyle.notificationUnread
                      : HeaderStyle.notificationIcon
                  }
                />
                {notificationCount ? (
                  <span className={HeaderStyle.count}>{notificationCount}</span>
                ) : (
                  ''
                )}
              </div>

              <ul className={HeaderStyle.notificationList}>
                {isNotificationOpen && (
                  <>
                    <div id="dialogBorder" className={HeaderStyle.dialogBorder}>
                      <li className={HeaderStyle.notificationListHeader}>
                        <span>おしらせ</span>
                        <button onClick={this.clearNotifications} type="button">
                          すべてクリア
                        </button>
                      </li>
                      <div className={HeaderStyle.scrollAble}>
                        {notifications.length ? (
                          notifications.map((n) => (
                            <li key={this.commentId++}>
                              {this.commentTemplate(n.data)}
                            </li>
                          ))
                        ) : (
                          <li className={HeaderStyle.noNotification}>
                            現在通知はありません。
                          </li>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </ul>

              <div className={HeaderStyle.user}>
                <span className={HeaderStyle.userName}>
                  {loggedUser && loggedUser.username}
                </span>
                {/* <div className={HeaderStyle.userImage}>
                  <User fill="white" className={HeaderStyle.userImageSvg} />
                </div> */}
                <NcDropdown
                  handleClick={this.handleClick}
                  menus={this.menus}
                  toggle={this.toggle}
                  isOpen={isOpen}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    lang: state.commonReducer.lang,
    activeMenu: state.commonReducer.activeMenu,
    globalSearchText: state.commonReducer.globalSearchText,
    rawMaterial: state.commonReducer.rawMaterial,
    content: state.commonReducer.content,
    loggedUser: state.authReducer.loginData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setMenu: (menu) => dispatch(setMenu(menu)),
    logoutWithRemoveStore: () => dispatch(logoutWithRemoveStore()),
    setGlobalSearchText: (text) => dispatch(setGlobalSearchText(text)),
    fieldInitialization: (data) => dispatch(fieldInitialization(data)),
    clearLoginData: () => dispatch(clearLoginData())
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
