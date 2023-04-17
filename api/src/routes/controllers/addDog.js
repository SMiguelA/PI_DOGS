const { Dog } = require("../../db");

const addDog = async ({ Name, Image, Height, Weight, Life_span, Temperaments }) => {
    if(!Name || !Image || !Height || !Weight || !Life_span || !Temperaments) throw new Error("Missing data to make the request");
    if(!/^(ftp|http|https):\/\/[^ "]+$/.test(Image)) throw new Error("Tipo de dato de imagen invalido");

    const newDog = await Dog.create({
        Name,
        Image,
        Height,
        Weight,
        Life_span
    });
    
    newDog.addTemperament(Temperaments);
    return newDog;
};

module.exports = addDog;