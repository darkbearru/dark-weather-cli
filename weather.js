#!/usr/bin/env node
import process from 'process';
import {getArgs} from "./helpers/args.js";
import {printError, printHelp, printSuccess, printWeather} from "./services/log.service.js";
import {saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";


const saveParam = async (key, value) => {
    if (!value.length) {
        printError('${key} not received');
        return;
    }
    try {
        await saveKeyValue(key, value);
        printSuccess(`${key} saved`);
    } catch (e) {
        printError(e.message);
    }
}

const getForecast = async () => {
    try {
        const weather = await getWeather();
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Bad city name');
        }else if (e?.response?.status === 401) {
            printError('Bad token');
        } else {
            printError(e.message);
        }
    }
};

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.s) {
        return saveParam(TOKEN_DICTIONARY.city, args.s);
    }
    if (args.t) {
        return saveParam(TOKEN_DICTIONARY.token, args.t);
    }
    if (args.h) {
        printHelp();
    }
    return getForecast();
}

initCLI();