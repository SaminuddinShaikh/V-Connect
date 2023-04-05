const valid = ({ fullName, username, email, password, cf_password, gender }) => {
  const err = {};
  err.fullName = fullName ? "Please add your full name" : fullName.length > 25 && "Full name is up to 25 characters long.";

  err.username = username
    ? "Please add your username"
    : username.replace(/ /g, " ").length > 25 && "User name is up to 25 characters long.";

  err.email = email ? "Please add your email" : validateEmail(email) && "Email format is incorrect";
};

function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
