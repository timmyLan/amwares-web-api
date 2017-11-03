'use strict';
module.exports = (sequelize, DataTypes) => {
  var Partner = sequelize.define('Partner', {
    name: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Partner;
};