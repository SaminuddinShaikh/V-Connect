import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

const EditProfile = ({ user, setOnEdit }) => {
  const initialState = {
    fullName: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };

  const [userData, setUerData] = useState(initialState);
  const { fullName, mobile, address, website, story, gender } = userData;

  const { auth, theme } = useSelector((state) => state);

  const [avatar, setAvatar] = useState("");

  const changeAvatar =()=>{

  }

  const handleInput =(e)=>{
    const {name, value} = e.target
    setUerData({...userData, [name]:value})
  }

  return (
    <div className="edit-profile">
      <button
        className="btn btn-danger btn_close"
        onClick={() => setOnEdit(false)}
      >
        Close
      </button>
      <form>
        <div className="info-avatar">
          <img
          className="supper-avatar"
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="Avatar"
            style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          />
          <span>
          <i><FontAwesomeIcon icon={faCamera} /></i>
          <p>Change</p>
          <input type="file" name="file" id="file-up" accept="image/*" onChange={changeAvatar} />
          </span>
        </div>
        <div className="from-group">
            <label htmlFor="fullName">Full Name</label>
            <div className="position-relative" > 
                <input type="text" className="form-control" id="fullName" placeholder="Full Name" name="fullName" value={fullName} onChange={handleInput} />
                <small className="text-danger position-absolute" style={{top:'50%', right:'5px', transform:'translateY(-50%)'}} >
                    {fullName.length}/25
                </small>
            </div>
        </div>

        <div className="form-group">
        <label htmlFor="mobile">Mobile</label>
        <input type="tel" className="form-control" id="mobile" name="mobile" placeholder="Phone Number" minLength="10" maxLength="10" value={mobile} onChange={handleInput} />
        </div>

        <div className="form-group">
        <label htmlFor="address">Address</label>
        <input type="text" className="form-control" id="address" name="address" placeholder="Address"  value={address} onChange={handleInput} />
        </div>

        <div className="form-group">
        <label htmlFor="website">Web-Site</label>
        <input type="text" className="form-control" id="website" name="website" placeholder="website" value={website} onChange={handleInput} />
        </div>

      </form>
    </div>
  );
};
 
export default EditProfile;