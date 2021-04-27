import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { LoginPage, LoginPhonePage } from '../app/login/index';
import {
  ForgetPasswordPage,
  ForgetPasswordPhonePage,
  ForgetPasswordConfirmPage
} from '../app/forget-password/index';
import { PasswordResetPage } from '../app/password-reset/index';
import {
  RegistrationPage,
  MentorRegistrationPage,
  RegistrationConfirmationPage,
  RegistrationPhoneConfirmationPage
} from '../app/registration/index';
import ManageAccess from "./ManageAccess";

const routes = [
  {
    path: "/",
    exact: true,
    component: LoginPage
  },
  {
    path: "/login",
    component: LoginPage
  },
  {
    path: "/login-phone",
    component: LoginPhonePage
  },
  {
    path: "/forget-password",
    component: ForgetPasswordPage
  },
  {
    path: "/forget-password-phone",
    component: ForgetPasswordPhonePage
  },
  {
    path: "/forget-password-confirm",
    component: ForgetPasswordConfirmPage
  },
  {
    path: "/password-reset",
    component: PasswordResetPage
  },
  {
    path: "/registration",
    component: RegistrationPage
  },
  {
    path: "/mentor-registration",
    component: MentorRegistrationPage
  },
  {
    path: "/registration-confirmation",
    component: RegistrationConfirmationPage
  },
  {
    path: "/registration-phone-confirmation",
    component: RegistrationPhoneConfirmationPage
  }
//   {
//     path: "/tacos",
//     component: Tacos,
//     routes: [
//       {
//         path: "/tacos/bus",
//         component: Bus
//       },
//       {
//         path: "/tacos/cart",
//         component: Cart
//       }
//     ]
//   }
];

export const MainRoutes = () => {
  return (
    <Router>
        <Switch>
          {routes.map((route, i) => (
            // <RouteWithSubRoutes key={i} {...route} />
            <ManageAccess
                key={i}
                path={route.path}
                exact={route.exact}
                component={route.component}
            />
          ))}
        </Switch>
    </Router>
  );
}

const RouteWithSubRoutes = (route, index) => {
  return (
    <Route
      key={index}
      path={route.path}
      exact={route.exact}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}