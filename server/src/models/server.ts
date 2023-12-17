import express from "express"
import routesProduct from '../routes/product'
import routesUser from '../routes/user'
import { Rol } from "./rol"
import { Usuario } from "./users"
import Bicicleta from "./bicicleta"
import Ubicacion from "./ubicacion"


export class Server {
    private app: express.Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Aplicacion corriendo en el puerto: " + this.port)
        });
    }

    routes() {
        this.app.use('/api/products', routesProduct)
        this.app.use('/api/users', routesUser)
    }

    middlewares() {
        this.app.use(express.json());
    }

    async dbConnect() {
        try {
            await Rol.sync();
            await Usuario.sync({ alter: true });
            await Ubicacion.sync({ alter: true });
            await Bicicleta.sync({ alter: true });
            console.log("Connect");
        } catch (error) {
            console.log("Unable to connect: " + error);
        }
    }
}