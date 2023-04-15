import React from "react";
import { useSelector } from "react-redux";

const Avatar = ({ size }) => {
  const { auth, theme } = useSelector((state) => state);

  return <img src={auth.user.avatar} alt="avatar" className={size} style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }} />;
};

export default Avatar;