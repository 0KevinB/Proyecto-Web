// carrito.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product'; // Ajusta la ruta

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:3000/api/carrito'; // Ajusta la URL según sea necesario

  constructor(private http: HttpClient) { }

  addToCart(item: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/agregar`, item);
  }

  getItems(): Observable<Product[]> {
    // No se requiere el argumento cedulaUsuario en la función getItems
    return this.http.get<Product[]>(`${this.apiUrl}/obtener`);
  }

  clearCart(): Observable<void> {
    // No se requiere el argumento cedulaUsuario en la función clearCart
    return this.http.delete<void>(`${this.apiUrl}/vaciar`);
  }
}
