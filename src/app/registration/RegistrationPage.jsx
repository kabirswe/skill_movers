import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { AuthLayout } from '../../containers/AuthLayout';
import Inputfield from '../../components/inputfield/Inputfield';
import InputCheckbox from '../../components/inputCheckbox/InputCheckbox';
import './static/RegistrationPage.scss';
import {ReactComponent as Facebook} from './static/image/facebook.svg';
import {ReactComponent as Gmail} from './static/image/gmail.svg';
import {ReactComponent as Linkedin} from './static/image/linkedin.svg';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRegistration} from '../../store/auth/registration';

export const RegistrationPage = () => {
	const dispatch = useDispatch();
	const playerList = useSelector((state: any) => state.register);

	const [inputs, setInputs] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { first_name, last_name, email, password } = inputs;

	// reset login status
    // useEffect(() => { 
    //     dispatch(userActions.logout()); 
    // }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (first_name && last_name && email && password) {
			console.log("ok");
			console.log(first_name, last_name, email, password);
				
			const registrationData = {
				name: first_name + ' ' + last_name,
				medium: 'email',
				emailOrPhone: email,
				password: password,
				role: 'student'
			};
			dispatch(fetchRegistration(registrationData));
            // get return url from location state or default to home page
            // const { from } = location.state || { from: { pathname: "/" } };
            // dispatch(userActions.login(username, password, from));
        }
    }

	return (
		<div className="registration-page">
			<AuthLayout>
				<div className="registration-container">
					<div className="registration-wrapper">
						<h2>Get Quick Register to Skill Movers</h2>
						<div className="btn-block">
							<button className="btn-gmail">
								<Gmail fill="white" />
								<span>Register with Google</span>
							</button>
							<button className="btn-facebook">
								<Facebook fill="white" />
								<span>Facebook</span>
							</button>
							<button className="btn-linkedin">
								<Linkedin fill="white" />
							</button>
						</div>
						<h2>or, <hr/></h2>
						<form onSubmit={handleSubmit}>
							<div className="inline-input">
								<Inputfield
									inputLabel="Name"
									placeHolder="First name"
									textType="text"
									inputName="first_name"
									value={first_name}
									onchangeCallback={handleChange}
									inputClassName={submitted && !first_name ? ' is-invalid' : ''}
									requiredMessage={submitted && !first_name}
									requiredMessageLabel="First Name is required"
								/>
								<Inputfield
									placeHolder="Last name"
									textType="text"
									inputName="last_name"
									value={last_name}
									onchangeCallback={handleChange}
									inputClassName={submitted && !last_name ? ' is-invalid' : ''}
									requiredMessage={submitted && !last_name}
									requiredMessageLabel="Last Name is required"
								/>
							</div>
							<Inputfield
								inputLabel="Email Or Phone Number "
								placeHolder="email"
								textType="email"
								inputName="email"
								value={email}
								onchangeCallback={handleChange}
								inputClassName={submitted && !email ? ' is-invalid' : ''}
								requiredMessage={submitted && !email}
								requiredMessageLabel="Email is required"
							/>
							
							<Inputfield
								inputLabel="Password"
								placeHolder="Password"
								textType="password"
								inputName="password"
								value={password}
								onchangeCallback={handleChange}
								inputClassName={submitted && !password ? ' is-invalid' : ''}
								requiredMessage={submitted && !password}
								requiredMessageLabel="Password is required"
							/>
							<InputCheckbox
								inputLabel="I wish to receive marketing emails, promotional offers and newsletters"
								placeHolder="newsletters"
								textType="checkbox"
								inputName="newsletter"
							/>
							<div className="action-block">
								<button type="submit">Create Account</button>
								<div className="link-block">
									<Link to="/login">Register <span>as Mentor</span></Link>
									<Link to="/login">Go back to the  <span>Log In</span></Link>
								</div>
							</div>
						</form>
					</div>
					<div className="login-link">Registering to the SkillMovers, you accept our <Link to="/login">Terms of use</Link> and <Link to="/login">Privacy policy</Link></div>
				</div>
			</AuthLayout>
		</div>
	)
};