import React from "react";
import "../styles/Home.css";
import ReactPlayer from "react-player";
import { BiLogIn } from "react-icons/bi";
import Login from "./Login";
import Register from "./Register";
import Loginform from "./Loginform";
import video from "../asset/premier_league 2.MOV";
export default function Home() {
  const [show_register, setshow_register] = React.useState(false);
  return (
    <div className="login-container">
      <div className="video-container">
        {/* <ReactPlayer
          url="https://www.youtube.com/watch?v=GqtlrXnMmug"
          loop={true}
          muted={true}
          playing={true}
          width="100%"
          height="100%"
        /> */}
        <video
          controls={false}
          loop
          muted
          autoPlay="autoplay"
          playsInline
          src={video}
          className="video"
        ></video>
      </div>
      <div className="overlay">
        {!show_register && (
          <Login
            show_register={show_register}
            setshow_register={setshow_register}
          />
        )}
        {show_register && (
          <Register
            show_register={show_register}
            setshow_register={setshow_register}
          />
        )}
      </div>
    </div>
  );
}
