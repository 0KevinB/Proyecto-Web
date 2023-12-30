import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router: Router = new Router();
  const _errorService: ErrorService = new ErrorService();
  const token = localStorage.getItem('token')
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        _errorService.msjError(error)
        router.navigate(['/login'])
      }
      return throwError(() => error);
    })
  )
};
