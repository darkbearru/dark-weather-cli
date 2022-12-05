//yargs - библиотека разбора аргументов
export const getArgs = (args) => {
    const res = {};
    const [, , ...params] = args;

    params.forEach((value, index, array) => {
        if (value.charAt(0) === '-') {
            const key = value.substring(1);
            if (index === array.length - 1) {
                res[key] = true;
            } else if (array[index + 1].charAt(0) !== '-') {
                res[key] = array[index + 1];
            } else {
                res[key] = true;
            }
        }
    });

    return res;
}