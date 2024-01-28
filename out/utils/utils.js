"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeString = void 0;
const capitalizeString = (str) => {
    if (str.length < 1) {
        return str;
    }
    return str[0].toUpperCase() + str.slice(1);
};
exports.capitalizeString = capitalizeString;
//# sourceMappingURL=utils.js.map