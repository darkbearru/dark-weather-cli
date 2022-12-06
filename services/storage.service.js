import {homedir} from 'os';
import {join} from 'path';
import {promises} from 'fs';

const filePath = join(homedir(), 'weather.data.json');
const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
};

const saveKeyValue = async (key, value) => {
    const data = await getFileData(filePath);
    data[key] = value;

    await promises.writeFile(filePath, JSON.stringify(data));
}

const getKeyValue = async (key) => {
    const data = await getFileData(filePath);
    return data[key] || undefined;
}

const getFileData = async (fileName) => {
    let data = {};
    if (await isExists(fileName)) {
        const file = await promises.readFile(fileName);
        data = JSON.parse(file.toString());
    }
    return data || {};
}

const isExists = async (fileName) => {
    try {
        await promises.stat(fileName);
        return true;
    }catch(e)  {
        return false;
    }
}


export {saveKeyValue, getKeyValue, TOKEN_DICTIONARY};