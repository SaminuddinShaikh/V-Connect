import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Avatar from "../Avatar";
import { getProfileUsers } from "../../redux/actions/profileActions";
import EditProfile from "./EditProfile";

const Info = () => {
  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false)

  useEffect(() => {
    if(id === auth.user._id){
        setUserData([auth.user])
    }else{dispatch(getProfileUsers({ users: profile.users, id, auth }))
    const newData = profile.users.filter(user => user._id === id)
    setUserData(newData)}
        
  }, [id, auth, dispatch, profile.users]);

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info-container" key={user._id}>
          <Avatar src={user.avatar} size="supper-avatar" />
          <div className="info-content">
            <div className="info-content-title">
              <h2>{user.username}</h2>
              <button className="btn btn-outline-info" onClick={() => setOnEdit(true)}>Edit Profile</button>
            </div>
            <div className="follow-btn">
              <span className="me-4">{user.followers.length}Followers</span>
              <span className="me-4">{user.following.length}Following</span>
            </div>
            <h6>
              {user.fullName} {user.mobile}
            </h6>
            <p className="m-0">{user.address}</p>
            <h6>{user.email} </h6>
            <a href={user.website} target="_blank" rel="noreferrer">
              {user.website}{" "}
            </a>
            <p>{user.story}</p>
          </div>
          {
            onEdit && <EditProfile user={user} setOnEdit={setOnEdit} />
          }
        </div>
      ))}
    </div>
  );
};

export default Info;
