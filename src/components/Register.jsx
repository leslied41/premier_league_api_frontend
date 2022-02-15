import React from "react";
import "../styles/Register.css";
import { useState } from "react";
import axios from "axios";

const Register = ({ show_register, setshow_register }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [show_feedback, setshow_feedback] = useState(false);
  const [show_fail, setshow_fail] = useState(false);
  const handleChange = (e) => {
    //console.log(e.target.type);
    const value = e.target.value;
    if (e.target.type == "email") {
      setemail(value);
    }
    if (e.target.type == "password") {
      setpassword(value);
    }
  };
  const backLogin = () => {
    setshow_register(!show_register);
  };
  const handleSubmit = (e) => {
    setshow_fail(false);
    e.preventDefault();
    const new_user = {
      email: email,
      password: password,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/register`, new_user, {
        withCredentials: true,
      })
      .then(function (response) {
        //console.log(response);
        setshow_feedback(true);

        setTimeout(() => {
          setshow_feedback(false);
          setshow_register(!show_register);
        }, 2000);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status == 401) {
          setshow_fail(true);
        }
      });
    setemail("");
    setpassword("");
  };
  return (
    <>
      <div>
        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            <input
              required
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={email}
            />
          </label>
          <label>
            <input
              required
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={password}
            />
          </label>
          <button type="submit">Register</button>
          {show_feedback && (
            <div className="feedback">
              <p>Congratulations!</p>
              <p>You have sign up a new user.</p>
            </div>
          )}
          {show_fail && (
            <div className="feedback">
              <p>Sorry! Please try again.</p>
              <p>This email has been registered.</p>
            </div>
          )}
          <div className="back-login" onClick={backLogin}>
            Back to Login?
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
