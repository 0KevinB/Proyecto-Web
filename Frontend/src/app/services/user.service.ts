// users.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  // Definimos la URL base del API
  baseUrl = 'http://localhost:8080';

  signup(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user).pipe(
      catchError((error) => {
        console.error('Error en la petición de signup:', error);
        return throwError(error);
      })
    );
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user).pipe(
      catchError((error) => {
        console.error('Error en la petición de login:', error);
        return throwError(error);
      })
    );
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get`).pipe(
      catchError((error) => {
        console.error('Error en la petición de getUsers:', error);
        return throwError(error);
      })
    );
  }
}
