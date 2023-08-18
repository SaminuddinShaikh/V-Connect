import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { checkImage } from "../../utils/imageUpload";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const EditProfile = ({ setOnEdit }) => {
  const initialState = {
    fullName: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };

  const [userData, setUerData] = useState(initialState);
  const { fullName, mobile, address, website, story } = userData;

  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setUerData(auth.user);
  }, [auth.user]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    err !== " " && dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    name === "mobile" ? setUerData({ ...userData, [name]: value.replace(/\D/g, "") }) : setUerData({ ...userData, [name]: value });
  };

  return (
    <div className="edit-profile">
      <button className="btn btn-danger btn_close" onClick={() => setOnEdit(false)}>
        Close
      </button>
      <form>
        <div className="info-avatar">
          <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="Avatar" style={{ filter: theme ? "invert(1)" : "invert(0)" }} />
          <span>
            <label htmlFor="file-up">
              <FontAwesomeIcon icon={faCamera} />
            </label>
            <p>Change</p>
            <input type="file" name="file" id="file-up" accept="image/*" onChange={changeAvatar} />
          </span>
        </div>
        <div className="from-group">
          <label htmlFor="fullName">Full Name</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Full Name"
              name="fullName"
              value={fullName}
              onChange={handleInput}
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
              }}
            >
              {fullName.length}/25
            </small>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="tel"
            className="form-control"
            id="mobile"
            name="mobile"
            placeholder="Phone Number"
            minLength="10"
            maxLength="10"
            value={mobile}
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" className="form-control" id="address" name="address" placeholder="Address" value={address} onChange={handleInput} />
        </div>

        <div className="form-group">
          <label htmlFor="website">Web-Site</label>
          <input type="text" className="form-control" id="website" name="website" placeholder="website" value={website} onChange={handleInput} />
        </div>

        <div className="form-group">
          <label htmlFor="story">Story</label>
          <textarea className="form-control" id="story" name="story" placeholder="story" value={story} onChange={handleInput} />
          <small className="text-danger d-block text-right">{story.length}/200</small>
        </div>
        <label htmlFor="gender">Gender</label>
        <div className="input-group-prepend px-0 mb-4">
          <select name="gender" id="gender" className="custom-select text-capitalize w-100" onChange={handleInput}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button className="btn btn-info w-100" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
