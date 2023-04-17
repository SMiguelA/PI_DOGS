require('dotenv').config();
const { API_KEY, URL_API } = process.env;
const axios = require("axios");

const getApiData = async () => {
    const { data } = await axios.get(`${URL_API}?api_key=${API_KEY}`);
    const apiData = await data.map((element) => {
        return {
            ID: element.id,
            Image: element.image.url,
            Name: element.name,
            Height: element.height.metric.split(" - "),
            Weight: element.weight.metric.split(" - "),
            Temperaments: element.temperament ? element.temperament.split(", ") : null,
            Life_span: element.life_span
        }
    })
    return apiData;
};



module.exports = getApiData;
