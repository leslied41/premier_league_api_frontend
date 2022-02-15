import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import Popup from "./Popup";
import SearchBar from "./SearcchBar";
import PopupDel from "./PopupDel";

const Dashboard = () => {
  const [teams, setteams] = useState([]);
  const [update, setupdate] = useState();
  const [editing, setediting] = useState({});
  const [isEditing, setisEditing] = useState(false);
  const [del_popup, setdel_popup] = useState(false);
  const [del_team_id, setdel_team_id] = useState();
  //teamarea
  const [team_name, setteam_name] = useState();
  const [team_value, setteam_value] = useState();
  const [team_founded, setteam_founded] = useState();
  const [team_manager, setteam_manager] = useState();
  const [team_venue, setteam_venue] = useState();
  const [open_popup, setopen_popup] = useState(false);
  const [user, setuser] = useState(false);
  useEffect(() => {
    //console.log("fecth data");
    const token = localStorage.getItem("token");
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/teams`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const teams = res.data.teams;
          setteams(teams);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } catch (error) {
      console.log(error);
    }
  }, [update, editing]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data.role == "user") {
          setuser(true);
        }
      });
  }, []);
  const deleteoneTeam = (id) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/api/teams/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        console.log("delete successful");
        setupdate(new Date().getTime().toString());
      })
      .catch((error) => {
        console.error(error.response);
      });
  };
  const addNewTeam = () => {
    if (user) {
      return;
    }
    console.log("add new team");
    setopen_popup(true);
  };
  const editTeam = (id) => {
    if (user) {
      return;
    }
    //console.log(`edit${id}`);
    setediting({ id: `${id}` });
  };
  const handleChange_name = (e) => {
    setteam_name(e.target.value);
    //console.log("1");
  };
  const handleChange_value = (e) => {
    setteam_value(e.target.value);
    //console.log(team_value);
  };
  const handleChange_founded = (e) => {
    setteam_founded(e.target.value);
    //console.log(team_founded);
  };
  const handleChange_manager = (e) => {
    setteam_manager(e.target.value);
    //console.log(team_manager);
  };
  const handleChange_venue = (e) => {
    setteam_venue(e.target.value);
    //console.log(team_venue);
  };
  const updateTeam = (id) => {
    const token = localStorage.getItem("token");

    const { name, manager, founded, venue, teamValue } = teams.find(
      (team) => team.id == id
    );
    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/api/teams/update/${id}`,
        {
          name: team_name ? team_name : name,
          founded: team_founded ? team_founded : founded,
          teamValue: team_value ? team_value : teamValue,
          manager: team_manager ? team_manager : manager,
          venue: team_venue ? team_venue : venue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        //console.log(res);
        setediting({});
      })
      .catch((err) => console.log(err));

    setteam_venue();
    setteam_manager();
    setteam_founded();
    setteam_value();
    setteam_name();
  };
  return (
    <>
      <div className="heading">Premier League API Dashboard</div>
      <div className="main">
        {open_popup && (
          <div>
            <Popup setopen_popup={setopen_popup} setupdate={setupdate} />
          </div>
        )}
        {del_popup && (
          <PopupDel
            setdel_popup={setdel_popup}
            deleteoneTeam={deleteoneTeam}
            setdel_team_id={setdel_team_id}
            del_team_id={del_team_id}
          />
        )}

        <div className="team-table">
          <div className="tool-container">
            <div className="team-title">Premier League Teams</div>
            <div className="add-icon" onClick={addNewTeam}>
              <BiPlus />
              <span className="icon-span">New Team</span>
            </div>
            <div className="search-bar">
              <SearchBar setteams={setteams} />
            </div>
          </div>
          <div className="teams-list">
            <div className="team-container table-title ">
              <div>NAME</div>
              <div>MANAGER</div>
              <div>FOUNDED</div>
              <div>TEAM VALUE</div>
              <div>VENUE</div>
            </div>
            {teams.map((team) => {
              const { founded, manager, name, teamValue, venue, id } = team;
              return (
                <div key={id} className="team-container">
                  <div className="team-item">
                    {editing.id === id ? (
                      <textarea
                        name="name"
                        value={team_name ? team_name : name}
                        rows="1"
                        className="textarea"
                        onChange={handleChange_name}
                      />
                    ) : (
                      name
                    )}
                  </div>
                  <div>
                    {editing.id === id ? (
                      <textarea
                        name="manager"
                        value={team_manager ? team_manager : manager}
                        rows="1"
                        className="textarea"
                        onChange={handleChange_manager}
                      />
                    ) : (
                      manager
                    )}
                  </div>
                  <div>
                    {editing.id === id ? (
                      <textarea
                        name="founded"
                        value={team_founded ? team_founded : founded}
                        rows="1"
                        className="textarea"
                        onChange={handleChange_founded}
                      />
                    ) : (
                      founded
                    )}
                  </div>
                  <div>
                    {editing.id === id ? (
                      <textarea
                        name="teamValue"
                        value={team_value ? team_value : teamValue}
                        rows="1"
                        className="textarea"
                        onChange={handleChange_value}
                      />
                    ) : (
                      teamValue
                    )}
                  </div>
                  <div>
                    {editing.id === id ? (
                      <textarea
                        name="venue"
                        value={team_venue ? team_venue : venue}
                        rows="1"
                        className="textarea"
                        onChange={handleChange_venue}
                      />
                    ) : (
                      venue
                    )}
                  </div>
                  <div
                    className="tool-icon"
                    onClick={() => {
                      //deleteoneTeam(id);
                      setdel_popup(true);
                      setdel_team_id(id);
                    }}
                  >
                    <AiFillDelete />
                  </div>
                  <div
                    className="tool-icon"
                    onClick={() => {
                      if (!isEditing) {
                        editTeam(id);
                        setisEditing(true);
                      } else {
                        if (editing.id === id) {
                          updateTeam(id);
                          setisEditing(false);
                        }
                      }
                    }}
                  >
                    <AiFillEdit />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
