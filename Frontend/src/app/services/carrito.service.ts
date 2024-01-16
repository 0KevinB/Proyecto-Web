// carrito.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../interfaces/product'; // Ajusta la ruta
import { CarritoItem } from '../interfaces/carritoItem';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:3000/api/carrito'; // Ajusta la URL según sea necesario

  constructor(private http: HttpClient) { }

  addToCart(product: CarritoItem): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/agregar`, product);
  }

  getItems(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/obtener`);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/vaciar`);
  }

  reserveProduct(product: CarritoItem): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reservar`, product);
  }

  private productoSeleccionadoSubject = new BehaviorSubject<Product | null>(null);
  productoSeleccionado$ = this.productoSeleccionadoSubject.asObservable();

  setProductoSeleccionado(data: Product): void {
    this.productoSeleccionadoSubject.next(data);
  }

  getProductoSeleccionado(): Product | null {
    const valorActual = this.productoSeleccionadoSubject.value;
    return valorActual;
  }

}