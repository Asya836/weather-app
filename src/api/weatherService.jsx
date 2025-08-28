import axios from "axios";

const BASE_URL = 'https://api.openweathermap.org';
const API_KEY = '43e66c6ae687bc0d4c8b4273efd39dd2';

async function getCoordinates(city) {
    const res = await axios.get(`${BASE_URL}/geo/1.0/direct`, {
        params: {
            q: city,
            limit: 1,
            appid: API_KEY
        }
    });
    if (!res.data || res.data.length === 0) {
        throw new Error("Şehir bulunamadı");
    }
    return {
        lat: res.data[0].lat,
        lon: res.data[0].lon
    };
}

export const getWeather = async (city) => {
    const { lat, lon } = await getCoordinates(city);
    const res = await axios.get(`${BASE_URL}/data/2.5/weather`, {
        params: {
            lat,
            lon,
            appid: API_KEY,
            lang: "tr",
            units: "metric"
        }
    });
    return res.data;
};
