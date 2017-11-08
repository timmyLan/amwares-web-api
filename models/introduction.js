'use strict';
module.exports = (sequelize, DataTypes) => {
  var Introduction = sequelize.define('Introduction', {
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Introduction;
};