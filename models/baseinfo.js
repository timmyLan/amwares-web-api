'use strict';
module.exports = (sequelize, DataTypes) => {
  var BaseInfo = sequelize.define('BaseInfo', {
    logoUrl: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    copyright: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BaseInfo;
};