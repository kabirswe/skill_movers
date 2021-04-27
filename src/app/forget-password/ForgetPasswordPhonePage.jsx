import React from 'react';
import { Link } from "react-router-dom";
import { AuthLayout } from '../../containers/AuthLayout';
import Inputfield from '../../components/inputfield/Inputfield'
import './static/ForgetPasswordPage.scss';

export class ForgetPasswordPhonePage extends React.Component {
    render() {
        return (
            <div className="forget-password-page">
                <AuthLayout>
                    <div className="forget-password-container">
                       <div className="forget-password-wrapper">
                           <h2>Forgot your password?</h2>
                           <p>Please, enter your phone number</p>
                           <form action="">
                               <Inputfield
                                    inputLabel="Phone Number"
                                    labelLink="/forget-password"
                                    labelLinkText="Try Email"
                                    placeHolder="phone number"
                                    textType="text"
                                    inputName="phone"
                               />
							   <div className="action-block">
								   <button type="button">Continue</button>
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
