import dotenv from 'dotenv';
import { Server } from "./models/server";

// Configuracion de las variables de entorno
dotenv.config();

const server = new Server();
