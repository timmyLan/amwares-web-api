'use strict';
module.exports = (sequelize, DataTypes) => {
    var Content = sequelize.define('Content', {
        title: DataTypes.STRING,
        url: DataTypes.STRING,
        description: DataTypes.STRING
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
