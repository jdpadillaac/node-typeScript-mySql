"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroes/getAllHeroes', (req, res) => {
    const query = `
    SELECT * 
    FROM heroes
    `;
    mysql_1.default.ejecutarQuery(query, (err, heroes) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.status(200).json({
                ok: true,
                message: 'Successful Request',
                heroes: heroes
            });
        }
    });
});
router.get('/heroes/:id', (req, res) => {
    const heroeId = req.params.id;
    // escapar el ID
    const escapeId = mysql_1.default.instance.cnn.escape(heroeId);
    const query = `
    SELECT * 
    FROM heroes
    where id = ${escapeId}
    `;
    mysql_1.default.ejecutarQuery(query, (err, heroe) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.status(200).json({
                ok: true,
                heroe: heroe[0]
            });
        }
    });
});
// Crear un heroe
router.post('/heroes/crearHeroe', (req, res, next) => {
    let body = req.body;
    let id = body.id;
    let nombre = body.nombre;
    let casa = body.casa;
    let poder = body.poder;
    const query = `INSERT INTO heroes  VALUES (null, '${nombre}', '${casa}', '${poder}')`;
    mysql_1.default.ejecutarQuery(query, (err, heroeCreado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Invalid request',
                error: err
            });
        }
        else {
            return res.status(200).json({
                ok: true,
                message: 'Heroe creado correctamente',
                heroeCreado: heroeCreado
            });
        }
    });
});
// Traer solo nombre y poder
router.get('/heroes/getHeroe/getHeroeByName', (req, res) => {
    const query = `
    SELECT nombre, poder
    FROM heroes
    `;
    mysql_1.default.ejecutarQuery(query, (err, result) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontro ningun registro con los parametros establecidos',
                err: err
            });
        }
        else {
            return res.status(200).json({
                ok: false,
                message: 'Successful Request',
                heroes: result
            });
        }
    });
});
// traer heroes por casa
router.get('/heroes/getHeroe/getByHouse/:house', (req, res) => {
    let heroeHouse = req.params.house;
    const query = `
        SELECT * FROM heroes WHERE casa = '${heroeHouse}'
    `;
    mysql_1.default.ejecutarQuery(query, (err, heroes) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                message: `No se encontro ningun heroe de la casa ${heroeHouse}`,
                err: err
            });
        }
        return res.status(200).json({
            ok: true,
            message: `Heroes de la casa ${heroeHouse} cargados correctamente`,
            heroes: heroes
        });
    });
});
exports.default = router;
