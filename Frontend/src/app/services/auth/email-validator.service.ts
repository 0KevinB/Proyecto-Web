import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidator implements AsyncValidator {


  validate(control: AbstractControl ): Observable<ValidationErrors | null> {

    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors|null>( (subscriber) => {

      console.log({ email });

      if ( email === 'correo22@gmail.com' ) {
        subscriber.next({ emailTaken: true });
        subscriber.complete();
        // return;
      }

      subscriber.next(null);
      subscriber.complete();


    }).pipe(
      delay( 3000 )
    );

    return httpCallObservable;

  }


}


