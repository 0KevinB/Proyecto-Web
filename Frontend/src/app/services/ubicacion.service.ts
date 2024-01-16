import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ubicacion } from '../interfaces/ubicacion';
import { BehaviorSubject, Observable } from 'rxjs';
import { LatLngExpression } from 'leaflet';
import { FormGroup } from '@angular/forms';

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

  ubicacionForm: EventEmitter<any> = new EventEmitter();
  obtenerUbicacionAlClic(coordenadas: LatLngExpression) {
    this.ubicacionForm.emit(coordenadas);
  }

  private ubicacionSubject = new BehaviorSubject<any>(null);
  ubicacion$ = this.ubicacionSubject.asObservable();

  setUbicacion(data: FormGroup) {
    this.ubicacionSubject.next(data);
  }

  updateUbicacionDetails(ubicacionId: number | undefined, data: Ubicacion): Observable<Ubicacion> {
    return this.http.put<Ubicacion>(`${this.myAppUrl}${this.myApiUrl}updateUbicacion/${ubicacionId}`, data);
  }

}
