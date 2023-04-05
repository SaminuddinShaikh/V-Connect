import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../redux/actions/authActions";

const Register = () => {
  const { auth } = useSelector((state) => state);
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
          <input type="text" className="form-control" id="fullName" onChange={handleChangeInput} value={fullName} name="fullName" />
        </div>

        <div className="from-group">
          <label htmlFor="username" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            onChange={handleChangeInput}
            value={username.toLocaleLowerCase().replace(/ /g, " ")}
            name="username"
          />
        </div>

        <div className="from-group">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="exampleInputEmail1" onChange={handleChangeInput} value={email} name="email" />
          <div className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={handleChangeInput}
              value={password}
            />
            <small onClick={() => setTypePass(!typePass)}>{typePass ? "Hide" : "Show"}</small>
          </div>
        </div>

        <div className="form-group ">
          <label htmlFor="cf_password" className="form-label">
            Confirm Password
          </label>
          <div className="pass">
            <input
              type={typeCfPass ? "text" : "password"}
              className="form-control"
              id="cf_password"
              name="cf_password"
              onChange={handleChangeInput}
              value={cf_password}
            />
            <small onClick={() => setTypeCfPass(!typeCfPass)}>{typeCfPass ? "Hide" : "Show"}</small>
          </div>
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
