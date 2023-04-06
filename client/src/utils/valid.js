const valid = ({ fullName, username, email, password, cf_password }) => {
  const err = {};

  err.fullName = !fullName ? "Please add your full name." : fullName.length > 25 && "Full name must be below 25 characters long.";

  err.username = !username
    ? "Please add your user name."
    : username.replace(/ /g, "").length > 25 && "User name must be below 25 characters long.";

  err.email = !email ? "Please add your email." : !validateEmail(email) && "Email format is incorrect.";

  err.password = !password ? "Please add your password." : password.length < 6 && "Password must be at least 6 characters.";

  err.cf_password = password !== cf_password && "Confirm password did not match.";

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

function validateEmail(email) {
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default valid;
