import React from 'react';
import { Link } from "react-router-dom";
import { AuthLayout } from '../../containers/AuthLayout';
import Inputfield from '../../components/inputfield/Inputfield';
import InputCheckbox from '../../components/inputCheckbox/InputCheckbox';
import './static/RegistrationPage.scss';
import {ReactComponent as Facebook} from './static/image/facebook.svg';
import {ReactComponent as Gmail} from './static/image/gmail.svg';
import {ReactComponent as Linkedin} from './static/image/linkedin.svg';

export class MentorRegistrationPage extends React.Component {
    render() {
        return (
            <div className="registration-page">
                <AuthLayout>
                    <div className="registration-container">
                       <div className="registration-wrapper">
                           <h2>Register as Mentor to Skill Movers</h2>
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
                           <form action="">
                               <div className="inline-input">
                                    <Inputfield
                                        inputLabel="Name"
                                        placeHolder="First name"
                                        textType="text"
                                        inputName="first_name"
                                    />
                                    <Inputfield
                                        placeHolder="Last name"
                                        textType="text"
                                        inputName="last_name"
                                    />
                               </div>
                               <Inputfield
                                    inputLabel="Email Or Phone Number "
                                    placeHolder="email"
                                    textType="email"
                                    inputName="email"
                               />
                               <Inputfield
                                    inputLabel="Password"
                                    placeHolder="Password"
                                    textType="password"
                                    inputName="password"
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
                                        <Link to="/login"><span>Register as Mentor</span></Link>
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
    }
}
