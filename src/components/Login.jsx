import { BiLogIn } from "react-icons/bi";
import Loginform from "./Loginform";
import "../styles/Login.css";

const Login = ({ setshow_register, show_register }) => {
  const showRegister = () => {
    //console.log("show regi");
    setshow_register(!show_register);
  };
  return (
    <>
      <div className="login-logo">
        <BiLogIn />{" "}
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>Login</span>
      </div>
      <div>
        <Loginform />
        <div className="sign-up" onClick={showRegister}>
          Sign Up?
        </div>
      </div>
    </>
  );
};
export default Login;
