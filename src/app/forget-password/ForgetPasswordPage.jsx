import React from 'react';
import { Link } from "react-router-dom";
import { AuthLayout } from '../../containers/AuthLayout';
import Inputfield from '../../components/inputfield/Inputfield'
import './static/ForgetPasswordPage.scss';

export class ForgetPasswordPage extends React.Component {
    render() {
        return (
            <div className="forget-password-page">
                <AuthLayout>
                    <div className="forget-password-container">
                       <div className="forget-password-wrapper">
                           <h2>Forgot your password?</h2>
                           <p>Please, enter your email address</p>
                           <form action="">
                               <Inputfield
                                    inputLabel="Email"
                                    labelLink="/forget-password-phone"
                                    labelLinkText="Try Phone Number"
                                    placeHolder="email"
                                    textType="email"
                                    inputName="email"
                               />
							   <div className="action-block">
								   <button type="button"><Link to="/forget-password-confirm">Continue</Link></button>
								   <Link to="/login">Go back to the <span>Log In</span></Link>
							   </div>
                           </form>
                       </div>
                    </div>
                </AuthLayout>
            </div>
        )
    }
}
