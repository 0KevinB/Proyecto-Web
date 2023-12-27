import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/products/';
  }

  // Obtener un producto por su ID
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.myAppUrl}${this.myApiUrl}${productId}`);
  }

  // Crear un nuevo producto
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.myAppUrl}${this.myApiUrl}`, product);
  }

  // Actualizar un producto existente
  updateProduct(productId: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.myAppUrl}${this.myApiUrl}${productId}`, product);
  }

  // Eliminar un producto por su ID
  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${productId}`);
  }

  // Obtener todos los productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
}
