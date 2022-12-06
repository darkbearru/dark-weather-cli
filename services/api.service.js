import axios from 'axios';
import {getKeyValue, TOKEN_DICTIONARY} from "./storage.service.js";

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01' : return '☀️';
        case '02' : return '🌤';
        case '03' : return '⛅️';
        case '04' : return '☁️';
        case '09' : return '🌧';
        case '10' : return '🌦';
        case '11' : return '🌩';
        case '13' : return '❄️';
        case '50' : return '🌫';
    }
}

const getWeather = async () => {
    const token = process.env.TOKEN || await getKeyValue(TOKEN_DICTIONARY.token);
    const cityName = process.env.CITY || await getKeyValue(TOKEN_DICTIONARY.city);
    if (!token) {
        throw new Error('API key not set, you can set it use param -t [API_KEY]');
    }
    const { data } = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
            params: {
                q: cityName,
                appid: token,
                lang: 'ru',
                units: 'metric'
            }
        }
    )
    return data;
}


export {getWeather, getIcon};