const { Router } = require('express');
const router = Router();
const handlerDogs = require("./handlers/handlerDogs");
const handlerPostDogs = require("./handlers/handlerPostDogs");
const handlerDogsId = require("./handlers/handlerDogsId");
const handlerTemperaments = require("./handlers/handlerTemperaments");


//*************************************GET ROUTES*****************************//

// ? Get de todos los perros y los perros segun el name por query
router.get('/dogs', handlerDogs);

// ? Get perros segun el id de la raza
router.get('/dogs/:idRaza', handlerDogsId);

// ? Get de temperamentos
router.get('/temperaments', handlerTemperaments);

//*************************************POST ROUTES*****************************//
// ? POST para crear perros
router.post('/dogs', handlerPostDogs);

//**********************************MIDDLEWARE 404*****************************//
// ? Middleware para rutas no existentes
router.use((req, res) => {
    res.status(404).json({ err:"Pagina no encontrada" });
});


module.exports = router;
