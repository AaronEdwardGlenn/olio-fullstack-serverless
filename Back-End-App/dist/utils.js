"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.pickFromArray = (list) => {
    return list[exports.randomNumber(0, list.length - 1)];
};
//# sourceMappingURL=utils.js.map