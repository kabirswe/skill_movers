import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Header from './components/Header';
import MenuItem from './components/MenuItem';
import {addToast, type} from '../../redux/actions/toast';
import {
  setMenu,
  setMailMagazineMenu,
  setStatisticsMenu,
  setGlobalSearchText
} from '../../redux/actions/common';
import LayoutStyle from './defaultLayout.module.scss';
import {translator} from '../../localizations';
import {routes} from '../../app-constants';
import {mainMenus} from '../../routes';
import {MENUS} from '../../app-constants/menuContent';

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.routes = routes;
    this.globalMenus = [
      'Article Edit',
      'Raw Material',
      'Statistics OwnMedia',
      'Mail Magazine'
    ];
    this.state = {
      protectedMenus: null,
      menus: MENUS
    };
  }

  componentDidMount() {
    this.genMenus();
    const activeMenu = localStorage.getItem('activeMenu');
    this.props.setMenu(activeMenu);
    this.props.setGlobalSearchText('');
  }

  onMenuChange = (menu, pageTitle) => {
    if (this.props.detectArticleChange && this.props.detectArticleChange()) {
      window.location.reload()
      return
    }
    this.props.history.push(this.routes[menu]);
    localStorage.setItem('activeMenu', menu);
    this.props.setMenu(menu);
    if (menu == 'mail') {
      this.props.history.push(routes[menu]);
      this.props.setMailMagazineMenu('mailGroup');
    }
    if (menu == 'statistics') {
      this.props.history.push(routes[menu]);
      this.props.setStatisticsMenu('statisticsOwnMedia');
    }
  };

  genMenus = () => {
    // show menus based on permission
    
    const permissions = this.props.permissions ||  [];
    // check how many modules are allowed for this client and allocate menus only if module is exist
    const modulesForCurrentClient =
      (mainMenus &&
        this.state.menus.filter((menu) => mainMenus.includes(menu.module))) ||
      this.state.menus;
    const permitedMenus = [...permissions, ...this.globalMenus];
    const privateMenus = modulesForCurrentClient.filter((menu) =>
      permitedMenus.includes(menu.display_name)
    );
    this.setState({
      protectedMenus: privateMenus
    });
  };

  componentWillMount() {
    console.log('do some cleanup');
    this.props.addToast({
      type: type.clear,
      message: ''
    });
  }

  render() {
    const {activeMenu} = this.props;
    const {protectedMenus} = this.state;
    // console.log('always check the change difference ', this.props.callBack())
    return (
      <>
        <Header detectArticleChange={this.props.detectArticleChange}  />
        <div className={LayoutStyle.defaultLayout}>
          <div className={LayoutStyle.sideNav}>
            <ul className={LayoutStyle.navList}>
              {protectedMenus &&
                protectedMenus.map(
                  ({key, pageTitle, url, value, iconClass, Icon}) => {
                    return (
                      <li
                        className={activeMenu === key ? LayoutStyle.activeMenu : ' '}
                        onClick={() => this.onMenuChange(key, pageTitle)}
                        key={value}
                      >
                        <MenuItem
                          url={url}
                          name={translator(`SIDE_NAV.MENU_ITEM.${pageTitle}`)}
                          Icon={Icon}
                          iconClass={iconClass}
                        />
                      </li>
                    );
                  }
                )}
            </ul>
          </div>
          <div className={LayoutStyle.mainContent}>{this.props.children}</div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeMenu: state.commonReducer.activeMenu,
    toast: state.toast,
    permissions: state.authReducer.permissions
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setMenu: (menu) => dispatch(setMenu(menu)),
    addToast: (options) => dispatch(addToast(options)),
    setMailMagazineMenu: (menu) => dispatch(setMailMagazineMenu(menu)),
    setStatisticsMenu: (menu) => dispatch(setStatisticsMenu(menu)),
    setGlobalSearchText: (text) => dispatch(setGlobalSearchText(text))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DefaultLayout));
