import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";
import LoadIcon from "../../images/loading.gif";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    search
      ? getDataAPI(`search?username=${search}`, auth.token)
          .then((res) => setUsers(res.data.users))
          .catch((err) => {
            dispatch({
              type: GLOBALTYPES.ALERT,
              payload: { error: err.response.data.msg },
            });
          })
      : setUsers([]);
  }, [search, auth.token, dispatch]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value.toLocaleLowerCase().replace(/ /g, ""))
        }
      />
      <div className="search-icon" style={{ opacity: search ? 0 : 0.3 }}>
        <span className="material-icons">
          <SearchIcon />
        </span>
        <span>search</span>
      </div>
      <div
        className="close-search"
        style={{ opacity: users.length === 0 && search === "" ? 0 : 1 }}
        onClick={handleClose}
      >
        &times;
      </div>
      <button type="submit" style={{ display: "none" }}>
        search
      </button>
      {load && <img className="loading" src={LoadIcon} alt="loading" />}
      <div className="users">
        {search &&
          users.map((user) => {
            return (
              <UserCard
                key={user._id}
                user={user}
                border="border"
                handleClose={handleClose}
              />
            );
          })}
      </div>
    </form>
  );
};

export default Search;
