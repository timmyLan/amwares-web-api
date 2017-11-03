'use strict';
module.exports = (sequelize, DataTypes) => {
    var Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        url: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Product.hasMany(models.Content)
                Product.belongsTo(models.Classify)
            }
        }
    });
    return Product;
};