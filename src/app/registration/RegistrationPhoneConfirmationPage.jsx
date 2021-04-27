import React from 'react';
import { Link } from "react-router-dom";
import { AuthLayout } from '../../containers/AuthLayout';
import Inputfield from '../../components/inputfield/Inputfield';
import './static/RegistrationPage.scss';

export class RegistrationPhoneConfirmationPage extends React.Component {
	render() {
		return (
			<div className="registration-page">
				<AuthLayout>
					<div className="registration-container">
					   <div className="registration-wrapper">
						   	<h2>Registration Completed Successfully!</h2>
						   	<p className="confirm">Confirm your registration by the confirmation code sent in your phone number and completing your profile.</p>
						   	<p className="confirm-last">01*********74</p>
							<form action="">
								<div className="full-label">
									<div className="label-name">Confirmation Code</div>
									<Link to="/password-reset">00:50 sec remaining! <span>Send Again</span></Link>
								</div>
								<div className="inline-input-6">
									<Inputfield
										placeHolder="8"
										textType="number"
										inputName="n1"
									/>
									<Inputfield
										placeHolder="8"
										textType="number"
										inputName="n2"
									/>
									<Inputfield
										placeHolder="8"
										textType="number"
										inputName="n3"
									/>
									<Inputfield
										placeHolder="8"
										textType="number"
										inputName="n4"
									/>
									<Inputfield
										placeHolder="8"
										textType="number"
										inputName="n5"
									/>
									<Inputfield
										placeHolder="8"
										textType="number"
										inputName="n6"
									/>
								</div>
								<div className="action-block">
									<button type="button">
										<Link to="/password-reset">Verify</Link>
									</button>
									<Link to=""><span>Contact Support</span></Link>
								</div>
							</form>
					   </div>
					   <Link to="/login" className="login-link">Go back to the <span>Log In</span></Link>
					</div>
				</AuthLayout>
			</div>
		)
	}
}
