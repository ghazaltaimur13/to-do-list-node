'use strict';
var bcrypt = require("bcrypt-nodejs");
const salt = bcrypt.genSaltSync();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'ghazal',
      password: bcrypt.hashSync('ghazal123', salt),
      email: 'ghazaltaimur27@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
