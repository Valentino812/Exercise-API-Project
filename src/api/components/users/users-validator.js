const joi = require('joi');

module.exports = {
  createUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      password: joi.string().min(6).max(32).required().label('Password'),
      confirmPassword: joi.string().min(6).max(32).required().label('ConfirmPassword'), //KODE BARU untuk validasi confirmPassword
    },
  },

  updateUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
    },
  },

  //KODE BARU untuk validasi pada change change password
  changePassword: {
    body: {
      oldPassword: joi.string().min(6).max(32).required().label('OldPassword'),
      newPassword: joi.string().min(6).max(32).required().label('NewPassword'),
      confirmPassword: joi.string().min(6).max(32).required().label('ConfirmPassword'),
    },
  },
};
