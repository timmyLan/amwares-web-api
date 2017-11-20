'use strict';
module.exports = (sequelize, DataTypes) => {
    var Contact = sequelize.define('Contact', {
        address: DataTypes.STRING,
        tel: DataTypes.STRING,
        fax: DataTypes.STRING,
        email: DataTypes.STRING,
        contactUrl: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Contact;
};