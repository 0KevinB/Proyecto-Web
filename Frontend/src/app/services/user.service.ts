import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = '/api/users/'
  }
  singin(user: User): Observable<String> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}`, user)
  }
  login(user: User): Observable<String> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}login`, user)
  }

  sendResetEmail(email: string): Observable<any> {
    const data = { CorreoElectronico: email };
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}forgotPassword`, data);
  }

  resetPassword(token: string, newPassword: string): Observable<String> {
    const body = { token, newPassword };
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}resetPassword`, body);
  }

  getCedulaUsuario(): Observable<string | null> {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = this.decodeToken(token);
      return of(decodedToken ? decodedToken.Cedula : null);
    }
    return of(null);
  }

  getRolUsuario(): Observable<number | null> {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = this.decodeToken(token);
      return of(decodedToken ? decodedToken.RolID : null);
    }
    return of(null);
  }

  private decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }
}