import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const UserCard = ({ user, border, handleClose }) => {
  const handleCloseAll = () => {
    handleClose && handleClose();
  };

  return (
    <div className={`d-flex p-2 align-items-center ${border}`}>
      <div>
        <Link to={`/profile/${user._id}`} onClick={handleCloseAll} className="d-flex align-items-center">
          <Avatar size="big-avatar" src={user.avatar} />
          <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
            <span className="d-block">{user.username}</span>
            <small style={{ opacity: 0.7 }}>{user.fullName}</small>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
