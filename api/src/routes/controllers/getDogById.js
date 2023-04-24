const getAllDogs = require("./getAllDogs");

const getDogById = async (id) => {

    const dogsData = await getAllDogs();
    const dog = dogsData.filter(element => element.ID == id);
    if(dog.length == 0) throw new Error ("La raza consultada no existe");
    return dog[0];
};

module.exports = getDogById;