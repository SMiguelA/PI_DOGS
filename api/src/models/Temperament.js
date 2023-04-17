const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Temperament', {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
        }
    }, { timestamps: false })
};