import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import NearMeIcon from "@mui/icons-material/NearMe";
import ExploreIcon from "@mui/icons-material/Explore";
import { logout } from "../redux/actions/authActions";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import Avatar from "./Avatar";

const NavBar = () => {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();

  const navLinks = [
    { label: "Home", icon: <HomeIcon />, path: "/" },
    { label: "Message", icon: <NearMeIcon />, path: "/messages" },
    { label: "Discover", icon: <ExploreIcon />, path: "/discover" },
    { label: "Notify", icon: <FavoriteIcon />, path: "/notify" },
  ];
  return (
    <nav className="navbar navbar-expand-lg bg-dark-subtle rounded" aria-label="Thirteenth navbar example">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample11"
          aria-controls="navbarsExample11"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse d-lg-flex justify-content-lg-between" id="navbarsExample11">
          <Link className="navbar-brand col-lg-3 me-0" to={"/"}>
            <h1 className="navbar-brand text-uppercase p-0 m-0"> V-Connect {auth.user.username}</h1>
          </Link>

          <ul className="navbar-nav d-lg-flex col-lg-3 justify-content-lg-end ">
            {navLinks.map((link, index) => (
              <li className="nav-item" key={index}>
                <Link className={`nav-link ${location.pathname === link.path && "active"}`} to={link.path}>
                  <span className="material-icons">{link.icon}</span>
                </Link>
              </li>
            ))}
            <li className="nav-item dropstart ">
              <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Avatar />
              </span>
              <div className="dropdown-menu dropdown-menu-dark">
                <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
                  Profile
                </Link>
                <label htmlFor="theme" className="dropdown-item" onClick={() => dispatch({ type: GLOBALTYPES.THEME, payload: !theme })}>
                  {theme ? "Light Mode" : "Dark Mode"}
                </label>

                <hr className="dropdown-divider" />

                <Link className="dropdown-item" onClick={() => dispatch(logout())}>
                  Logout {auth.user.fullName.toUpperCase()}
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
