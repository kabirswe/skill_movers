import React from 'react';
import {connect} from "react-redux"
import {addToast, type} from "../redux/actions/toast"
import {Route, withRouter} from 'react-router-dom';
import {allowedAccess} from '../routes/access';
import {checkPageAccess} from '../helper'
import path from '../routes/path'

function ManageRole({user = {role: 'editor'}, component: Component, history, path, access, getProtectedRoutes, ...rest}) {

  const allowedRoutes = [
    ...allowedAccess.common,
    ...allowedAccess[user.role].routes
  ];

  history.listen((location, action) => {
   
    rest.addToast({
      type: type.clear,
      message: ''
    })
  });

  history.block(({pathname}) => {
    if (!checkPageAccess(rest.permissions) && pathname.includes('-content')) {
      return false
    }
  })
  
   return <Route path={path} {...rest} component={() => <Component access={access} getProtectedRoutes={getProtectedRoutes} />} />
  
}

function mapStateToProps(state) {
  return {
    permissions: state.authReducer.permissions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToast: (options) => dispatch(addToast(options))
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageRole));
