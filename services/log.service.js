import chalk from "chalk";
import dedent from "dedent-js";
const printError = error => {
    console.log(`${chalk.bgRed(' Error: ')} ${error}`);
}

const printSuccess = message => {
    console.log(`${chalk.bgGreen(' Success: ')} ${message}`);
}

const printHelp = () => {
    console.log(dedent`${chalk.bgCyan(' Help ')}
    Без параметров — вывод погоды
    -s [CITY] установка города
    -h Вывод помощи
    -t [API_KEY] для установки ключа API
    `);
}

const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgYellow(' Погода ')} в городе ${res.name}
            ${icon} ${res.weather[0].description} 
            Температура ${res.main.temp} (ощущается как ${res.main.feels_like})
            Влажность ${res.main.humidity}
            Скорость ветра ${res.wind.speed}
        `
    );

}


export {printError, printSuccess, printHelp, printWeather};