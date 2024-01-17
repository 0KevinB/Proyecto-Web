// carrito.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { Product } from '../interfaces/product'; // Ajusta la ruta
import { CarritoItem } from '../interfaces/CarritoItem';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient, private notificationService: NotificationService
  ) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = '/api/carrito/'
  }

  addToCart(product: CarritoItem): Observable<CarritoItem> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}agregar`, product)
  }

  handleError(error: any): Observable<never> {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Cliente HTTP o error de red
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // El backend devolvió un código de respuesta no exitoso
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  getProductoSeleccionado(): Product | null {
    const storedData = localStorage.getItem('productoSeleccionado');
    return storedData ? JSON.parse(storedData) : null;
  }

  getAlquilerByCedula(cedula: string | null): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}alquiler/${cedula}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  getAlquiler(): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}alquiler`;
    console.log(url);
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }
}