import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import NearMeIcon from "@mui/icons-material/NearMe";
import ExploreIcon from "@mui/icons-material/Explore";
import { logout } from "../../redux/actions/authActions";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";

const Menu = () => {
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
    <div className="menu">
      <ul className="navbar-nav flex-row ">
        {navLinks.map((link, index) => (
          <li className="nav-item" key={index}>
            <Link className={`nav-link ${location.pathname === link.path && "active"}`} to={link.path}>
              <span className="material-icons">{link.icon}</span>
            </Link>
          </li>
        ))}
        <li className="nav-item dropdown ">
          <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <Avatar size="medium-avatar" src={auth.user.avatar} />
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
  );
};

export default Menu;
