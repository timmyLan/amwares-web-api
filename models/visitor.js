'use strict';
module.exports = (sequelize, DataTypes) => {
    var Visitor = sequelize.define('Visitor', {
        ip: DataTypes.STRING,
        province: DataTypes.STRING,
        city: DataTypes.STRING,
        device: DataTypes.STRING,
        type: {
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
    return Visitor;
};