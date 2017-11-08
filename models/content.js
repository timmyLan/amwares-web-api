'use strict';
module.exports = (sequelize, DataTypes) => {
    var Content = sequelize.define('Content', {
        title: DataTypes.STRING,
        contentUrl: DataTypes.STRING,
        description: DataTypes.STRING,
        sort: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Content.belongsTo(models.Product)
            }
        }
    });
    return Content;
};
