import "../styles/Popup.css";
import { useState } from "react";
import axios from "axios";

const Popup = ({ setopen_popup, setupdate }) => {
  const [name, setname] = useState("");
  const [founded, setfounded] = useState("");
  const [manager, setmanager] = useState("");
  const [venue, setvenue] = useState("");
  const [value, setvalue] = useState("");
  const [show_feedback, setshow_feedback] = useState(false);
  const handleSubmit = () => {
    if (!name || !founded || !value || !venue || !manager) {
      //console.log("no null value input");
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/teams/add`,
        {
          name: name,
          founded: founded,
          teamValue: value,
          manager: manager,
          venue: venue,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setshow_feedback(true);

        setTimeout(() => {
          setshow_feedback(false);
          setopen_popup(false);
          setupdate(new Date().getTime().toString());
        }, 2000);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="overlay">
        <div className="popup-container">
          <div className="close-btn">
            <button
              onClick={() => {
                setopen_popup(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">New Team</div>
          <div className="form-container">
            <form className="form">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Club Name"
              />

              <input
                required
                type="text"
                value={manager}
                onChange={(e) => setmanager(e.target.value)}
                placeholder="Manager"
              />

              <input
                required
                type="text"
                value={venue}
                onChange={(e) => setvenue(e.target.value)}
                placeholder="Venue"
              />

              <input
                required
                type="text"
                value={value}
                onChange={(e) => setvalue(e.target.value)}
                placeholder="Team Value"
              />

              <input
                required
                type="text"
                value={founded}
                onChange={(e) => setfounded(e.target.value)}
                placeholder="When was Founded?"
              />
              <div className="btns">
                <div className="submit-btn">
                  <button onClick={handleSubmit}>Submit</button>
                </div>
                <div className="cancel-btn">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setopen_popup(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
          {show_feedback && (
            <div className="feedback-container">
              <div className="feedback">You have added {name}.</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Popup;
