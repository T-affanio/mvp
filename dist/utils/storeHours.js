"use strict";
// src/utils/storeHours.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDayKey = getDayKey;
exports.isWithinOpeningHours = isWithinOpeningHours;
function getDayKey(date) {
    return [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ][date.getDay()];
}
function isWithinOpeningHours(openingHours, now = new Date()) {
    const dayKey = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ][now.getDay()];
    const today = openingHours[dayKey];
    if (!today?.enabled || !today.open || !today.close) {
        return false;
    }
    const [openH, openM] = today.open.split(":").map(Number);
    const [closeH, closeM] = today.close.split(":").map(Number);
    const open = new Date(now);
    open.setHours(openH, openM, 0);
    const close = new Date(now);
    close.setHours(closeH, closeM, 0);
    // horário que vira o dia
    if (close <= open) {
        close.setDate(close.getDate() + 1);
    }
    return now >= open && now <= close;
}
