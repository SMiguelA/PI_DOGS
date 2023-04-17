const getAllDogs = require("../controllers/getAllDogs");

const handlerDogs = async (req, res) => {
    try {     
        const { name } = req.query;
        let dogBreeds;
        const dogs = await getAllDogs();
        if(name) {
            dogBreeds = dogs.filter(element => element.Name.toLowerCase().includes(name.toLowerCase()));

            dogBreeds.length ?
            res.status(200).json(dogBreeds) :
            res.status(400).json({ err: "No existen coinsidencias con la busqueda" });
        }else{
            res.status(200).json(dogs);
        }
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

module.exports = handlerDogs;