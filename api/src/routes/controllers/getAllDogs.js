const getApiData = require("../../searchData/getApiData");
const getDbData = require("../../searchData/getDbData");

const getAllDogs = async () => {
    const dogsApi = await getApiData();
    const dogsDb = await getDbData();

    const dogs = dogsApi.concat(dogsDb);
    if(!dogs) throw new Error("No se encontraron registros");
    return dogs;
};

module.exports = getAllDogs;