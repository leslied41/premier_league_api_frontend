import React from "react";
import "../styles/Register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Loginform = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [passwpord, setpasswpord] = useState("");
  const [no_user, setno_user] = useState(false);
  const [wrong_password, setwrong_password] = useState(false);
  const handleChange = (e) => {
    console.log(e.target.type);
    const value = e.target.value;
    if (e.target.type == "email") {
      setemail(value);
    }
    if (e.target.type == "password") {
      setpasswpord(value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setno_user(false);
    setwrong_password(false);

    const user = {
      email: email,
      password: passwpord,
    };
    axios.defaults.withCredentials = true;
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/login`, user, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        const access_token = response.data.token;
        //cookies.set("access-token", access_token);
        //setCookie("access-token", access_token);
        navigate("/dashboard");
      })
      .catch(function (error) {
        console.log(error.response);
        if (error.response.status == 404) {
          console.log("user does not exist");
          setno_user(true);
        }
        if (error.response.status == 401) {
          console.log("wrong password!");
          setwrong_password(true);
        }
      });
  };
  return (
    <>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={email}
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={passwpord}
            required
          />
        </label>
        <button type="submit">Login</button>
        {no_user && (
          <div className="feedback">
            <p>Sorry!</p>
            <p>This user does not exist.</p>
          </div>
        )}
        {wrong_password && (
          <div className="feedback">
            <p>Oops! Wrong password.</p>
          </div>
        )}
      </form>
    </>
  );
};

export default Loginform;
