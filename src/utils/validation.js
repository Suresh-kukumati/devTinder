const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateLoginData = (req) => {
  const { emailId } = req;
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }
};

module.exports = { validateSignUpData, validateLoginData };
