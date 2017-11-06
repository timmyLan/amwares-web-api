'use strict';
module.exports = (sequelize, DataTypes) => {
    var SlideShow = sequelize.define('SlideShow', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        link: DataTypes.STRING,
        slideshowUrl: DataTypes.STRING,
        sort: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return SlideShow;
};