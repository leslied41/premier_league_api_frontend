import "../styles/SeachBar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

const SearchBar = ({ setteams }) => {
  const [filter_item, setfilter_item] = useState("");
  const [search_content, setsearch_content] = useState("");
  const [sort_by, setsort_by] = useState("");
  const [loading, setloading] = useState(false);
  const [update, setupdate] = useState();

  const search = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const sort_url = !sort_by ? "" : `&sort=${sort_by}`;
    // if (!filter_item && !search_content && !sort_by) {
    //   try {
    //     setloading(true);
    //     axios
    //       .get(`${process.env.REACT_APP_BASE_URL}/api/teams/query?`, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       })
    //       .then((res) => {
    //         const teams = res.data;
    //         setteams(teams);
    //         setloading(false);
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   return;
    // }
    if ((!filter_item || !search_content) && !sort_by) {
      return;
    }

    try {
      setloading(true);
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
          setloading(false);
        });
    } catch (error) {
      console.log(error);
    }
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
    //it is not good underc this design, a submit button to start the search shoul be added.
    //then everything will be much easier.
    const sort_url = !sort_by ? "" : `&sort=${sort_by}`;
    // if (
    //   (!filter_item && !search_content) ||
    //   (!filter_item && search_content && sort_by) ||
    //   (!search_content && filter_item && sort_by)
    // ) {
    try {
      setloading(true);
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
          setloading(false);
        });
    } catch (error) {
      console.log(error);
    }
    //}

    // if (search_content && filter_item) {
    //   try {
    //     setloading(true);
    //     axios
    //       .get(
    //         `${process.env.REACT_APP_BASE_URL}/api/teams/query?${filter_item}=${search_content}${sort_url}`,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }
    //       )
    //       .then((res) => {
    //         const teams = res.data;
    //         setteams(teams);
    //         setloading(false);
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  }, [update]);
  return (
    <div className="search-bar-component">
      {loading && <Loading />}
      <form>
        <div>
          <input
            type="text"
            placeholder="Search"
            value={search_content}
            onChange={(e) => {
              setsearch_content(e.target.value);
              if (e.target.value == "") {
                setupdate(new Date().getTime().toString());
              }
            }}
          />
        </div>

        <div>
          <select
            value={filter_item}
            required
            onChange={(e) => {
              setfilter_item(e.target.value);
            }}
          >
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

        <div>
          <button onClick={search}>Do it!</button>
        </div>
      </form>
    </div>
  );
};
export default SearchBar;
