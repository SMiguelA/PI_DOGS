const getAllTemperaments = require("../controllers/getAllTemperaments");

const handlerTemperaments = async (req, res) => {
    try {
        const temperaments = await getAllTemperaments();
        res.status(200).json(temperaments);
    } catch (error) {
        res.status(404).json({ err: error.message });
    }
};

module.exports = handlerTemperaments;