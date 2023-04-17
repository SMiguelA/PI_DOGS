require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const createDog = require("./models/Dog");
const createTemperament = require("./models/Temperament");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false, native: false}
);

createDog(sequelize);
createTemperament(sequelize);

// Extraemos los modelos de sequelize.models
const { Dog, Temperament } = sequelize.models;

// Relacionamos los modelos (relacion de muchos a muchos)
Dog.belongsToMany(Temperament, { through: "dog_temperament" });
Temperament.belongsToMany(Dog, { through: "dog_temperament" });

module.exports = {
  conn:sequelize,
  ...sequelize.models
};