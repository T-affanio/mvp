"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const logger_1 = require("../logger");
const requestLogger = (req, res, next) => {
    const start = process.hrtime();
    res.on("finish", () => {
        const [secs, nanosecs] = process.hrtime(start);
        const ms = (secs * 1000 + nanosecs / 1e6).toFixed(2);
        logger_1.logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${ms} ms`, {
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: ms,
            userId: req.userId, // caso tenha
            ip: req.ip,
        });
    });
    next();
};
exports.requestLogger = requestLogger;
