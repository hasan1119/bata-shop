import React from "react";
import "./../assets/css/login.css";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import avatar from "./../assets/images/avater.png";
import useContexts from "../hooks/useContexts.js";
import { Spinner } from "react-bootstrap";
const Login = () => {
  const { userLogin, loading, email } = useContexts();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const location = useLocation();
  const redirect = location?.state?.from || "/home";
  const onSubmit = (data) => {
    userLogin({ ...data, history, redirect });
  };
  if (email) {
    return <>{history.replace("/")}</>;
  } else {
    return (
      <div className="login-page">
        <div
          style={{ height: "100vh" }}
          className="d-flex mx-3 align-items-center justify-content-center"
        >
          <div className="formContainer">
            <div className="text-center">
              <img width="120px" src={avatar} alt="" />
            </div>
            <h2 className="text-center text-white">Please Login</h2>
            <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
              <input
                className="form-control"
                type="email"
                required
                {...register("email", { required: true })}
                placeholder="Enter your email"
              />
              <input
                required
                type="password"
                className="form-control"
                {...register("password", { required: true })}
                placeholder="Enter your password"
              />
              <button className="btn register-btn" type="submit">
                {loading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Login"
                )}
              </button>
            </form>
            <h6 className="text-center text-white">
              New user? <Link to="/register"> Please register!</Link>
            </h6>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
