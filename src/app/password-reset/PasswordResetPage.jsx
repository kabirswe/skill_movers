import React from 'react';
import { Link } from "react-router-dom";
import { AuthLayout } from '../../containers/AuthLayout';
import Inputfield from '../../components/inputfield/Inputfield'
import './static/PasswordResetPage.scss';

export class PasswordResetPage extends React.Component {
    render() {
        return (
            <div className="password-reset-page">
                <AuthLayout>
                    <div className="password-reset-container">
                       <div className="password-reset-wrapper">
                           <h2>Reset your password</h2>
                           <p>Please, enter your new password</p>
                           <form action="">
                               <Inputfield
                                    inputLabel="New Password"
                                    placeHolder="new password"
                                    textType="password"
                                    inputName="password"
                               />
                               <Inputfield
                                    inputLabel="Confirm Password"
                                    placeHolder="Confirm password"
                                    textType="password"
                                    inputName="confirm_password"
                               />
							   <div className="action-block">
								   <button type="button"><Link to="/forget-password-confirm">Save</Link></button>
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
