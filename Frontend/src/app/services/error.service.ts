import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  msjError(e: HttpErrorResponse) {
    if (e.error.msg) {
      console.log(e.error.msg, 'Error');
    } else {
      console.log('Upps ocurrio un error, comuniquese con el administrador', 'Error');
    }
  }
}