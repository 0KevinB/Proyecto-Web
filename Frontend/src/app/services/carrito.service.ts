// carrito.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
    console.log('Servicio ', product);
    return this.http.post<CarritoItem>(`${this.myAppUrl}${this.myApiUrl}agregar`, product);
  }

  getProductoSeleccionado(): Product | null {
    const storedData = localStorage.getItem('productoSeleccionado');
    return storedData ? JSON.parse(storedData) : null;
  }
}