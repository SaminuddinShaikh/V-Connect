import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../redux/actions/authActions";

const Register = () => {
  const { auth, alert } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = { fullName: "", username: "", email: "", password: "", cf_password: "", gender: "male" };
  const [userData, setUserData] = useState(initialState);
  const { fullName, username, email, password, cf_password } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    auth.token && navigate("/");
  }, [auth.token, navigate]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">V-Connect</h3>

        <div className="from-group">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Full Name"
            className={`form-control ${alert.fullName ? "input-valid-err" : ""}`}
            id="fullName"
            onChange={handleChangeInput}
            value={fullName}
            name="fullName"
            required
          />
          <small className="form-text text-danger"> {alert.fullName ? alert.fullName : ""}</small>
        </div>

        <div className="from-group">
          <label htmlFor="username" className="form-label">
            User Name
          </label>
          <input
            type="text"
            placeholder="username"
            className={`form-control ${alert.username ? "input-valid-err" : ""}`}
            id="username"
            onChange={handleChangeInput}
            value={username.toLocaleLowerCase().replace(/ /g, " ")}
            name="username"
            required
          />
          <small className="form-text text-danger"> {alert.username ? alert.username : ""}</small>
        </div>

        <div className="from-group">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            placeholder="Email"
            className={`form-control ${alert.email ? "input-valid-err" : ""}`}
            id="exampleInputEmail1"
            onChange={handleChangeInput}
            value={email}
            name="email"
            required
          />
          <small className="form-text text-danger"> {alert.email ? alert.email : ""}</small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className={`form-control ${alert.password ? "input-valid-err" : ""}`}
              id="exampleInputPassword1"
              name="password"
              onChange={handleChangeInput}
              value={password}
              required
            />
            <small onClick={() => setTypePass(!typePass)}>{typePass ? "Hide" : "Show"}</small>
          </div>
          <small className="form-text text-danger"> {alert.password ? alert.password : ""}</small>
        </div>

        <div className="form-group ">
          <label htmlFor="cf_password" className="form-label">
            Confirm Password
          </label>
          <div className="pass">
            <input
              type={typeCfPass ? "text" : "password"}
              className={`form-control ${alert.cf_password ? "input-valid-err" : ""}`}
              id="cf_password"
              name="cf_password"
              onChange={handleChangeInput}
              value={cf_password}
              required
            />
            <small onClick={() => setTypeCfPass(!typeCfPass)}>{typeCfPass ? "Hide" : "Show"}</small>
          </div>
          <small className="form-text text-danger"> {alert.cf_password ? alert.cf_password : ""}</small>
        </div>

        <div className=" d-flex justify-content-between mx-0 mb-1">
          <label htmlFor="male">
            Male: <input type="radio" id="male" name="gender" value="male" defaultChecked onChange={handleChangeInput} />
          </label>

          <label htmlFor="female">
            Female: <input type="radio" id="female" name="gender" value="female" onChange={handleChangeInput} />
          </label>

          <label htmlFor="other">
            Other: <input type="radio" id="other" name="gender" value="other" onChange={handleChangeInput} />
          </label>
        </div>

        <button type="submit" className={`btn  w-100 mt-3 ${email && password ? "btn-dark" : "btn-secondary"} `}>
          Register
        </button>
        <p className="my-2">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "crimson" }}>
            Login Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
