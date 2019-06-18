'use strict';
var bcrypt = require("bcrypt-nodejs");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }  
  });
  User.associate = function(models) {
    // associations can be defined here
  };

  User.authenticate = async function(username, password) {

    const user = await User.findOne({ where: { username } });
    if (bcrypt.compareSync(password, user.password)) {
      return user.authorize();
    }

    throw new Error('invalid password');
  }
  return User;
};