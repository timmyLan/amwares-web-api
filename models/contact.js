'use strict';
module.exports = (sequelize, DataTypes) => {
  var Contact = sequelize.define('Contact', {
    address: DataTypes.STRING,
    tel1: DataTypes.STRING,
    tel2: DataTypes.STRING,
    tel3: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Contact;
};