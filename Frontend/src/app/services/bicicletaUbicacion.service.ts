import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BicicletaUbicacion } from '../interfaces/BicicletaUbicacion';

@Injectable({
  providedIn: 'root'
})
export class BicicletaUbicacionService {
  private myAppUrl: string;
  private myApiUrl: string;
  // Configuración de opciones para la solicitud HTTP
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/bicicletaUbicacions/';
  }

  getBicicletaUbicacionsWithImages(): Observable<BicicletaUbicacion[]> {
    return this.http.get<BicicletaUbicacion[]>(`${this.myAppUrl}${this.myApiUrl}bikes`);
  }
}

