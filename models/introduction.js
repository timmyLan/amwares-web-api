'use strict';
module.exports = (sequelize, DataTypes) => {
  var introduction = sequelize.define('introduction', {
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return introduction;
};