import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "../../containers/AuthLayout";
import Inputfield from "../../components/inputfield/Inputfield";
import "./static/LoginPage.scss";
import { ReactComponent as Facebook } from "./static/image/facebook.svg";
import { ReactComponent as Gmail } from "./static/image/gmail.svg";
import { ReactComponent as Linkedin } from "./static/image/linkedin.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearApiError, loginApi } from "../../redux/actions/auth";
import axios from "axios";
import ApiServices from "../../networks/ApiServices";
import AxiosServices from "../../networks/AxiosService";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({ value: "", error: "", required: false });
  const [password, setPassword] = useState({
    value: "",
    error: "",
    required: false,
  });
  const login = useCallback(() => {
    const data = {
      medium: "phone",
      emailOrPhone: email.value,
      password: password.value,
    };
    try {
      AxiosServices.post(ApiServices.SIGN_IN, data, false)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          setEmail({
            ...email,
            error: error.response.data.message,
            required: true,
          });
        });
    } catch (err) {
      console.log("catch", err);
    }
  }, [email, password]);

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
            <h2>
              or, <hr />
            </h2>
            {/* <h1>{email.error}</h1> */}
            <form action="">
              <Inputfield
                inputLabel="Email"
                labelLink="/login-phone"
                labelLinkText="Try Phone Number"
                placeHolder="email"
                textType="email"
                inputName="email"
                inputValue={email.value}
                onchangeCallback={(e) =>
                  setEmail({ ...email, value: e.target.value })
                }
                requiredMessage={email.required}
                requiredMessageLabel={email.error}
              />
              <Inputfield
                inputLabel="Password"
                labelLink="/forget-password"
                labelLinkText="Forget Password"
                placeHolder="Password"
                textType="password"
                inputName="password"
                inputValue={password.value}
                onchangeCallback={(e) =>
                  setPassword({ ...password, value: e.target.value })
                }
                requiredMessage={password.required}
                requiredMessageLabel={password.error}
              />
              <div className="action-block">
                <button type="button" onClick={login}>
                  Sign In
                </button>
                <Link to="/registration">
                  Not a member? <span>Register Now</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
};
