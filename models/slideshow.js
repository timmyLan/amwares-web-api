'use strict';
module.exports = (sequelize, DataTypes) => {
  var SlideShow = sequelize.define('SlideShow', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    link: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SlideShow;
};