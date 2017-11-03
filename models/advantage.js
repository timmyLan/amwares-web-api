'use strict';
module.exports = (sequelize, DataTypes) => {
  var Advantage = sequelize.define('Advantage', {
    description: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Advantage;
};