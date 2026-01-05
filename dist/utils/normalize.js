"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = normalize;
function normalize(text) {
    return text
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
