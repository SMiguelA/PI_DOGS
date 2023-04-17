const getDogById = require("../controllers/getDogById");

const handlerDogsId = async (req, res) => {
    try {
        const { idRaza } = req.params;
        const dog = await getDogById(idRaza);
        res.status(200).json(dog);
    } catch (error) {
        res.status(400).json({ err: error.message });
    }
};

module.exports = handlerDogsId;
