const { Dog, Temperament } = require("../db");

const getDbData = async () => {
    const dogs = await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['Name'],
            through: {
                attributes: []
            }
        }
    });
    return dogs;
};

module.exports = getDbData;