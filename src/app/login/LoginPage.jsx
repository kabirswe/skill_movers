import React from 'react';
import { Link } from "react-router-dom";
import { AuthLayout } from '../../containers/AuthLayout';
import Inputfield from '../../components/inputfield/Inputfield';
import './static/LoginPage.scss';
import {ReactComponent as Facebook} from './static/image/facebook.svg';
import {ReactComponent as Gmail} from './static/image/gmail.svg';
import {ReactComponent as Linkedin} from './static/image/linkedin.svg';
import {useDispatch, useSelector} from 'react-redux';
import { decrement, increment } from '../../store/testSlice';

export const LoginPage = () => {
    const dispatch = useDispatch();
    const value = useSelector((state) => state.testSlice.value);
    return (
        <div className="login-page">
            <AuthLayout>
                <div className="login-container">
                    <div className="login-wrapper">
                        <h2>Log in to Skill Movers</h2>
                        <div className="btn-block">
                            <button className="btn-gmail">
                                <Gmail fill="white" />
                                <span>Sign in with Google</span>
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
                            <Inputfield
                                inputLabel="Email"
                                labelLink="/login-phone"
                                labelLinkText="Try Phone Number"
                                placeHolder="email"
                                textType="email"
                                inputName="email"
                            />
                            <Inputfield
                                inputLabel="Password"
                                labelLink="/forget-password"
                                labelLinkText="Forget Password"
                                placeHolder="Password"
                                textType="password"
                                inputName="password"
                            />
                            <div className="action-block">
                                <button type="button" onClick={() => dispatch(increment()) }>Sign In</button>
                                <p>{value}</p>
                                <Link to="/registration">Not a member? <span>Register Now</span></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </AuthLayout>
        </div>
    )
};