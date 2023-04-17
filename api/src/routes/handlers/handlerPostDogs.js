const addDog = require("../controllers/addDog");

const handlerPostDogs = async (req, res) => {
    try {
        const { Name, Image, Height, Weight, Life_span, Temperaments } = req.body;
        const dogs = await addDog({ Name, Image, Height, Weight, Life_span, Temperaments });
        res.status(201).json(dogs);
    } catch (error) {
        res.status(400).json({ err: error.message });
    }
};

module.exports = handlerPostDogs;