"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importando express de la carpeta server
const server_1 = __importDefault(require("./server/server"));
const routes_1 = __importDefault(require("./routes/routes"));
const server = server_1.default.init(5000);
server.app.use(routes_1.default);
// MySql.instance;
server.start(() => {
    console.log('Servido correndo en puerto 3000');
});
