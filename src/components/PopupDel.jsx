import "../styles/Popup.css";
import { useState } from "react";
import axios from "axios";

const PopupDel = ({
  setdel_popup,
  deleteoneTeam,
  del_team_id,
  setdel_team_id,
}) => {
  const handleSubmit = () => {
    deleteoneTeam(del_team_id);
    setdel_team_id();
    setdel_popup(false);
  };
  return (
    <>
      <div className="overlay">
        <div className="popup-container">
          <div className="close-btn">
            <button
              onClick={() => {
                setdel_popup(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">Delete this team?</div>
          <div className="form">
            <div className="btns">
              <div className="submit-btn">
                <button onClick={handleSubmit}>Delete</button>
              </div>
              <div className="cancel-btn">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setdel_popup(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupDel;
