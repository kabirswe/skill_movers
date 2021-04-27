import React from 'react';
import './static/AuthLayour.scss';
import {ReactComponent as Ct} from './static/image/ct.svg';
import {ReactComponent as LogoText} from './static/image/logo-text.svg';
import {ReactComponent as SkillBanner} from './static/image/skill-banner.svg';
import CtText from './static/image/ct-text.png';

export class AuthLayout extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    // console.log("componentDidMount");
  }

  componentWillMount() {
    // console.log('do some cleanup');
  }

  render() {
    return (
      <>
        <div className="auth-layout">
          <div className="left-banner-block">
            <Ct fill="white" className="ct" />
            <img src={CtText} className="ct-text" alt="ct text" />
            <LogoText fill="white" className="logo-text" />
            <SkillBanner fill="white" className="skill-banner" />
          </div>
          <div className="right-form-block">
            {this.props.children}
          </div>
        </div>
      </>
    );
  }
}

