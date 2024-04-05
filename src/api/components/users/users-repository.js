const { User } = require('../../../models');
const { passwordMatched } = require('../../../utils/password'); //KODE BARU untuk mengambil function passwordMatched

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return User.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing password
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

//KODE BARU untuk mengecek keberadaan email
async function checkEmail(email) {
  const user = await User.findOne({ email });
  return !!user; 
}

//KODE BARU untuk mengecek kebenaran password
async function checkPassword(id, password) {
  //mengambil data user
  const user = await User.findById(id);

  //bila user tidak ditemukan, maka return false
  if (!user) {
    return false;
  }
  //melakukan komparasi password yang dimasukan dengan password user yang telah di hash
  const matchedPassword = await passwordMatched(password, user.password)
  return !!matchedPassword; 
}

/**
 * Change existing password
 * @param {string} id - User ID
 * @param {string} password - New Password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        password,
      },
    }
  );
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkEmail, //KODE BARU
  checkPassword, //KODE BARU
  changePassword,
};
