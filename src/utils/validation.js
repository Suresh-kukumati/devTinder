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

const validateEditProfileData = (req) => {
  const allowUpdateFields = [
    "firstName",
    "lastName",
    "emailId",
    "desc",
    "photos",
    "skills",
    "gender",
    "about",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowUpdateFields.includes(field)
  );

  return isEditAllowed;
};

const validateForgotPasswordData = (req) => {
  const allowUpdateFields = ["oldPassword", "newPassword"];

  const isEditAllowed = Object.keys(req.body).every((fields) =>
    allowUpdateFields.includes(fields)
  );

  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateLoginData,
  validateEditProfileData,
  validateForgotPasswordData,
};
