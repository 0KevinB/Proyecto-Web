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
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/ubicacions/';
  }

  getUbicacion(bikeId?: number): Observable<Ubicacion[]> {
    if (bikeId) {
      return this.http.get<Ubicacion[]>(`${this.myAppUrl}${this.myApiUrl}bicicleta/${bikeId}`);
    } else {
      return this.http.get<Ubicacion[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }
  }
}
