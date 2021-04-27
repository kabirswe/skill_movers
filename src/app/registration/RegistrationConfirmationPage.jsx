import React from 'react';
import { Link } from "react-router-dom";
import { AuthLayout } from '../../containers/AuthLayout';
import './static/RegistrationPage.scss';

export class RegistrationConfirmationPage extends React.Component {
	render() {
		return (
			<div className="forget-password-page">
				<AuthLayout>
					<div className="forget-password-container">
					   <div className="forget-password-wrapper">
						   	<h2>Registration Completed Successfully!</h2>
						   	<p className="confirm">Confirm your registration by clicking on the link sent in E-mail and completing your profile.</p>
						   	<p className="confirm-last">k****k@gmail.com</p>
							<div className="action-block">
								<button type="button">
									<Link to="/password-reset">Check Email</Link>
								</button>
								<div className="link-block">
									<Link to="/login">Didn’t get the email! <span> Send Again</span></Link>
									<Link to="/login">Contact Support</Link>
								</div>
							</div>
					   </div>
					   <Link to="/login" className="login-link">Go back to the <span>Log In</span></Link>
					</div>
				</AuthLayout>
			</div>
		)
	}
}
