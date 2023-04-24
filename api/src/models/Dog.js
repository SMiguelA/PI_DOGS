const { DataTypes, Sequelize, BOOLEAN } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    ID:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    Image:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isUrl: true
      }
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Height:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    Weight:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    Life_span:{
      type: DataTypes.STRING,
      allowNull: false
    },
    CreatedInDB:{
      type: BOOLEAN,
      defaultValue: true
    }
  }, { timestamps: false });
};
