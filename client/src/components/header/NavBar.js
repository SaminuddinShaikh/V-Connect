import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Menu from "./Menu";
import Search from "./Search";

const NavBar = () => {
  const { auth } = useSelector((state) => state);

  return (
    <div className="header bg-light">
            <nav className="navbar navbar-expand-lg navbar-light 
            bg-light justify-content-between align-middle">

                <Link to="/" className="logo">
                <h1 className="navbar-brand text-uppercase p-0 m-0"> V-Connect {auth.user.username}</h1>
                </Link>

                <Search />

                <Menu />
            </nav>
        </div>
  );
};

export default NavBar;
