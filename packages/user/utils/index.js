const validator = require("validator");

function userValidation(email, password) {
  if (checkFields(email, password)) {
    if (validator.isEmail(email)) {
      if (password.length > 5 && password.length < 20) {
        return {
          notice: "Successful!",
          status: "OK",
        };
      }
      return {
        notice: "Password is bigger than 5 and smaller than 20.",
        status: "NO",
      };
    }
    return {
      notice: "This Email is not correct.",
      status: "NO",
    };
  }
  return {
    notice: "This fields can not be empty.",
    status: "NO",
  };
}

function checkFields(...args) {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "" || args[i] === null || args[i] == undefined) {
      return false;
    }
  }
  return true;
}

module.exports = { userValidation, checkFields };
