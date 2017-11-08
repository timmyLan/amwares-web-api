'use strict';
module.exports = (sequelize, DataTypes) => {
    var Classify = sequelize.define('Classify', {
        name: DataTypes.STRING,
        classifyUrl: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Classify.hasMany(models.Product)
            }
        }
    });
    return Classify;
};