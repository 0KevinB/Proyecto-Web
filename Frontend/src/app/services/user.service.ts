import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}