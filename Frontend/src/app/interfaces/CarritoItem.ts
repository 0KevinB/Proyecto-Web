import { Product } from "./product";

// carrito-item.ts
export interface CarritoItem {
    Producto: Product;
    CantidadHoras: number;
    PrecioTotal: number; // PrecioTotal es el resultado de Precio * CantidadHoras
}
