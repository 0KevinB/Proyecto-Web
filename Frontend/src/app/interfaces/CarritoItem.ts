import { Product } from "./product";

// carrito-item.ts
export interface CarritoItem {
    Cedula?: number;
    Producto: Product;
    CantidadHoras: number;
    PrecioTotal: number;
}
