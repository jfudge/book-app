'use strict';

const { model: User } = require('./userModel');

// create a new user and add to the database
exports.createUser = async (userData) => {

  const user = new User(userData);
  try {

     const checkEmail = userData.email;
     const [checkUser] = await User.find({ checkEmail });
     if (!checkUser) {

      const newUser = await user.save();
 
      return newUser;
    } else {
      const error = 'That email address is already in use! Please use another, or login.';
      return error;
    }
  } catch (e) {
 
    throw e;
  }
};

exports.isUser = async ({ email, password }) => {
  try {
    const [user] = await User.find({ email });
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        return user;
      }
    }
  } catch (e) {
    throw e;
  }
}
