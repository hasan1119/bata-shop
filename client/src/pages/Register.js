import React from "react";
import "./../assets/css/register.css";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import avatar from "./../assets/images/avater.png";
import useContexts from "../hooks/useContexts.js";
import { Spinner } from "react-bootstrap";
const Register = () => {
  const { UserRegister, loading, email } = useContexts();
  const history = useHistory();

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    UserRegister(data, history);
  };
  if (email) {
    return <>{history.replace("/login")}</>;
  } else {
    return (
      <div className="register-page">
        <div
          style={{ height: "100vh" }}
          className="d-flex mx-3 align-items-center justify-content-center"
        >
          <div className="formContainer">
            <div className="text-center">
              <img width="120px" src={avatar} alt="" />
            </div>
            <h2 className="text-center text-white">Please Register</h2>
            <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
              <input
                className="form-control"
                required
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter your name"
              />
              <input
                className="form-control"
                required
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
              />
              <input
                className="form-control"
                type="password"
                required
                {...register("password", { required: true })}
                placeholder="Enter your password"
              />
              <button className="btn register-btn" type="submit">
                {loading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Register"
                )}
              </button>
            </form>
            <h6 className="text-center text-white">
              Already registered? <Link to="/login"> Please Login!</Link>
            </h6>
          </div>
        </div>
      </div>
    );
  }
};

export default Register;
