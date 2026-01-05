"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const logger_1 = require("../logger");
const error_1 = require("./error");
function errorHandler(err, req, res, next) {
    if (err instanceof error_1.AppError) {
        // aviso — não é crash, mas precisa ser monitorado
        logger_1.logger.warn("AppError", {
            message: err.message,
            status: err.statusCode,
            path: req.originalUrl,
            userId: req.userId,
            stack: err.stack,
        });
        return res.status(err.statusCode).json({ message: err.message });
    }
    // erro não tratado — gravar full stack e retornar 500
    logger_1.logger.error("Unhandled Error", {
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        userId: req.userId,
    });
    return res.status(500).json({ message: "Internal server error" });
}
