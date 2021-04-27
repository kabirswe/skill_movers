import {
  SystemSetting,
  PersonOutline
} from '../assets/svgComp';

// import LayoutStyle from '../containers/DefaultLayout/defaultLayout.module.scss';

export const MENUS = [
  {
    value: 'user',
    url: '/users',
    key: 'user',
    pageTitle: 'USER',
    itemClass: '',
    iconClass: '',
    Icon: PersonOutline,
    display_name: 'User Management',
    module: 'Users'
  },
  {
    value: 'system setting',
    key: 'system_setting',
    pageTitle: 'SYSTEM_SETTING',
    url: '/system-settings',
    iconClass: '',
    Icon: SystemSetting,
    display_name: 'System Setting',
    module: 'SystemSettings'
  }
];
