"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const rol_1 = require("./rol");
const users_1 = require("./users");
const bicicleta_1 = __importDefault(require("./bicicleta"));
const ubicacion_1 = __importDefault(require("./ubicacion"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Aplicacion corriendo en el puerto: " + this.port);
        });
    }
    routes() {
        this.app.use('/api/products', product_1.default);
        this.app.use('/api/users', user_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield rol_1.Rol.sync();
                yield users_1.Usuario.sync({ alter: true });
                yield ubicacion_1.default.sync({ alter: true });
                yield bicicleta_1.default.sync({ alter: true });
                console.log("Connect");
            }
            catch (error) {
                console.log("Unable to connect: " + error);
            }
        });
    }
}
exports.Server = Server;
