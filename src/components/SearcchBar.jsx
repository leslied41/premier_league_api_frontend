import "../styles/SeachBar.css";
import { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ setteams }) => {
  const [filter_item, setfilter_item] = useState("");
  const [search_content, setsearch_content] = useState("");
  const [sort_by, setsort_by] = useState("");
  const filterItem = (e) => {
    setfilter_item(e.target.value);
  };
  useEffect(() => {
    // if (!filter_item || !search_content) {
    //   try {
    //     axios.get(`http://localhost:5000/api/teams`).then((res) => {
    //       const teams = res.data.teams;
    //       setteams(teams);
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    const token = localStorage.getItem("token");

    const sort_url = !sort_by ? "" : `&sort=${sort_by}`;
    if (!filter_item) {
      if (sort_by) {
        try {
          axios
            .get(
              `${process.env.REACT_APP_BASE_URL}/api/teams/query?${sort_url}`,

              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              const teams = res.data;
              setteams(teams);
            });
        } catch (error) {
          console.log(error);
        }
      }

      return;
    }

    try {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/api/teams/query?${filter_item}=${search_content}${sort_url}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const teams = res.data;
          setteams(teams);
        });
    } catch (error) {
      console.log(error);
    }
  }, [filter_item, search_content, sort_by]);
  return (
    <div className="search-bar-component">
      <div>
        <input
          type="text"
          value="Seach"
          placeholder="Search"
          value={search_content}
          onChange={(e) => {
            setsearch_content(e.target.value);
          }}
        />
      </div>
      <div>
        <select value={filter_item} required onChange={filterItem}>
          <option value="">Search By</option>
          <option value="name">NAME</option>
          <option value="manager">MANAGER</option>
          <option value="venue">VENUE</option>
          <option value="founded">FOUNDED</option>
          <option value="teamValue">TEAM VALUE</option>
        </select>
      </div>
      <div>
        <select
          value={sort_by}
          required
          onChange={(e) => {
            setsort_by(e.target.value);
          }}
        >
          <option value="">Sort By</option>
          <option value="name">NAME</option>
          <option value="manager">MANAGER</option>
          <option value="venue">VENUE</option>
          <option value="founded">FOUNDED</option>
          <option value="teamValue">TEAM VALUE</option>
        </select>
      </div>
    </div>
  );
};
export default SearchBar;
