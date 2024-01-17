import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';
import { product_add } from '../interfaces/product_add.';
import { Ubicacion } from '../interfaces/ubicacion';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;
  // Configuración de opciones para la solicitud HTTP
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/products/';
  }

  // Obtener un producto por su ID
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.myAppUrl}${this.myApiUrl}bicicletas/${productId}`);
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
  getProductsWithImages(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}bikes`);
  }

  // Obtener todos los productos
  getRentadas(): Observable<Product[]> {
    console.log("Product renta")
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}rentadas`);
  }

  // Agregar una bicicleta a un usuario
  createBicycleForUser(cedula: string, formData: product_add): Observable<any> {
    let datos = new FormData();
    datos.append("Modelo", formData.Modelo);
    datos.append("Tipo", formData.Tipo);
    datos.append("Estado", formData.Estado);
    datos.append("PrecioPorHora", formData.PrecioPorHora);
    datos.append("Descripcion", formData.Descripcion);
    datos.append("imagenReferencia", formData.imagenReferencia);
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}${cedula}/assign-bike`, datos)
      .pipe(
        tap((respuesta: any) => console.log(respuesta)) // Agrega esta línea para imprimir la respuesta en la consola
      );
  }

  bicicleta_ubicacion(bikeid: number, formData: Ubicacion): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}${bikeid}/assign-ubicacion`, formData);
  }

  approveProduct(productId: number): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}approve/${productId}`, null);
  }

}
