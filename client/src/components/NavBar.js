import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import NearMeIcon from "@mui/icons-material/NearMe";
import ExploreIcon from "@mui/icons-material/Explore";
import { logout } from "../redux/actions/authActions";

const NavBar = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const navLinks = [
    { label: "Home", icon: <HomeIcon />, path: "/" },
    { label: "Message", icon: <NearMeIcon />, path: "/message" },
    { label: "Discover", icon: <ExploreIcon />, path: "/discover" },
    { label: "Notify", icon: <FavoriteIcon />, path: "/notify" },
  ];
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Thirteenth navbar example">
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
            V-Connect
          </Link>

          <ul className="navbar-nav d-lg-flex col-lg-3 justify-content-lg-end ">
            {navLinks.map((link, index) => (
              <li className="nav-item">
                <Link className="nav-link active" to={link.path}>
                  <span className="material-icons">{link.icon}</span>
                </Link>
              </li>
            ))}
            <li className="nav-item dropstart ">
              <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                {auth.user.username}
              </Link>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li>
                  <Link className="dropdown-item" to={"/profile"}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/"}>
                    Dark Mode
                  </Link>
                </li>
                <hr className="dropdown-divider" />
                <li>
                  <Link className="dropdown-item" onClick={() => dispatch(logout())}>
                    Logout {auth.user.fullName.toUpperCase()}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
