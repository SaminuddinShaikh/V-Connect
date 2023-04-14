import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Menu from "./Menu";
import Search from "./Search";

const NavBar = () => {
  const { auth } = useSelector((state) => state);

  return (
    <div className="header bg-light">
      <nav className="navbar navbar-expand-lg nav-bg rounded" aria-label="Thirteenth navbar example">
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
            <Link className="navbar-brand col-lg-3 me-0 logo" to={"/"}>
              <h1 className="navbar-brand text-uppercase p-0 m-0"> V-Connect {auth.user.username}</h1>
            </Link>
            <Search />
            <Menu />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
