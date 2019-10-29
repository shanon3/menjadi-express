'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('Todos', {
    userId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: 3,
          msg: "title must be atleast 3 characters in length"
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    completed: DataTypes.BOOLEAN,
    dateActivity: DataTypes.DATE
  }, {});
  Todos.associate = function(models) {
    // associations can be defined here
  };
  return Todos;
};

