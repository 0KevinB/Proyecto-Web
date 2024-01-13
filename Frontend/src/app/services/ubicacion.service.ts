import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ubicacion } from '../interfaces/ubicacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private myAppUrl: string;
  private myApiUrl: string;
  // Configuración de opciones para la solicitud HTTP
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/ubicacions/';
  }

  getUbicacionById(LocationId: number): Observable<Ubicacion> {
    return this.http.get<Ubicacion>(`${this.myAppUrl}${this.myApiUrl}${LocationId}`);
  }
  getUbicacionsWithImages(): Observable<Ubicacion[]> {
    return this.http.get<Ubicacion[]>(`${this.myAppUrl}${this.myApiUrl}bikes`);
  }

  getUbicacion(): Observable<Ubicacion[]> {
    return this.http.get<Ubicacion[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }
}
