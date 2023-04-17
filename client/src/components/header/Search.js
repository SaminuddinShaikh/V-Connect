import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {useSelector,  useDispatch} from 'react-redux'
import {getDataAPI} from '../../utils/fetchData'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import {Link} from 'react-router-dom'
import UserCard from "../UserCard";


const Search = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("");

  const {auth} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(()=>{
    search ? (getDataAPI(`search?username=${search}`, auth.token)
    .then(res => setUsers(res.data.users))
    .catch(err => {
      dispatch({type:GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    })):(setUsers([]))
},[search, auth.token, dispatch])

const handleClose = () =>{
  setSearch('')
  setUsers([])
}

  return (
    <form className="search-form">
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLocaleLowerCase().replace(/ /g, ""))}
      />
      <div className="search-icon" style={{ opacity: search ? 0 : 0.3 }}>
        <span className="material-icons">
          <SearchIcon />
        </span>
        <span>search</span>
      </div>
      <div className="close-search" style={{opacity: (users.length === 0 && search ==="" ) ? 0 : 1}} onClick={handleClose }>&times;</div>
    <div className="users">
      {search && users.map((user)=>{
       return( <Link key={user._id} to={`/profile/${user._id}`} onClick={handleClose}>
       <UserCard user={user} border="border" />
     </Link>)
      })}
    </div>
    </form>
  );
};

export default Search;
