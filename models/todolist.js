'use strict';
module.exports = (sequelize, DataTypes) => {
  const ToDoList = sequelize.define('ToDoList', {
    item: DataTypes.STRING
  }, {});
  ToDoList.associate = function(models) {
    // associations can be defined here
  };
  return ToDoList;
};