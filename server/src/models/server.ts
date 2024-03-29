import express from "express"
import cors from "cors";
import routesProduct from '../routes/product'
import routesUbicacion from '../routes/ubicacion'
import routesCart from '../routes/cart'
import routesUser from '../routes/user'
import { Rol } from "./rol"
import Usuario from "./usuario"
import Bicicleta from "./bicicleta"
import Ubicacion from "./ubicacion"
import Alquiler from "./alquiler"
import Transaccion from "./transaccion"
import PropietarioBicicletas from "./propietarioBicicletas"
import Bicicleta_Ubicacion from "./Bicicleta_Ubicacion"
import Carrito from "./Carrito";


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
        this.app.use('/api/ubicacions', routesUbicacion)
        this.app.use('/api/carrito', routesCart)
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors({
            origin: 'http://localhost:4200',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        }));
    }

    async dbConnect() {
        try {
            await Rol.sync();
            await Usuario.sync({ alter: true });
            await Ubicacion.sync({ alter: true });
            await Bicicleta.sync({ alter: true });
            await Bicicleta_Ubicacion.sync({ alter: true });
            await Alquiler.sync({ alter: true });
            await Transaccion.sync({ alter: true });
            await PropietarioBicicletas.sync({ alter: true });
            await Carrito.sync({ alter: true });
            console.log("Connect");
        } catch (error) {
            console.log("Unable to connect: ", error);
        }
    }
}