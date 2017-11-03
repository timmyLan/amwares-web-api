'use strict';
module.exports = (sequelize, DataTypes) => {
  var Link = sequelize.define('Link', {
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Link;
};