import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div>
      <form classNameName="auth_page">
        <h3 className="text-uppercase text-center mb-4">V-Connect</h3>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value={email}
            name="email"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={handleChangeInput}
            value={password}
          />
        </div>
        <button type="submit" className="btn btn-primary w-50" disabled={email && password ? false : true}>
          Login
        </button>
        <p className="my-2">
          You don't have an account?{" "}
          <Link to="/register" style={{ color: "crimson" }}>
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
