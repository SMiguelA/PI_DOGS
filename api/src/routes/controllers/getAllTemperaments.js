const getApiData = require("../../searchData/getApiData");
const { Temperament } = require("../../db");

const getAllTemperaments = async () => {
    const dataApi = await getApiData();
    const dataTemperaments = dataApi.map((element) => {
        return element.Temperaments;
    });
    const temperaments = dataTemperaments.flat();
    const uniqueTemp = [...new Set(temperaments)];

    uniqueTemp.forEach((element) => {
        Temperament.findOrCreate({
            where: { Name: element ? element : null}
        });
    });

    return Temperament.findAll();
};

module.exports = getAllTemperaments;