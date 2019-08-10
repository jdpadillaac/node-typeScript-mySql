"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const userRoutes = express_1.Router();
userRoutes.get('/getAllUsers', (req, res, next) => {
    const query = `
    SELECT * FROM users
    `;
    mysql_1.default.ejecutarQuery(query, (err, users) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                message: 'Error en base de datos al cargar usuarios',
                err: err,
            });
        }
        else {
            return res.status(200).json({
                ok: true,
                message: 'Lista de usuarios cargada correctamente',
                usuarios: users
            });
        }
    });
});
exports.default = userRoutes;
