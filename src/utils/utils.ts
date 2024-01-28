export const capitalizeString = (str: string) => {
    if (str.length < 1) {
        return str;
    }

    return str[0].toUpperCase() + str.slice(1);
}