import { ValidarcedulaService } from './../../services/validarcedula.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { NotificationService } from 'src/app/services/notification.service';
import { NavComponent } from "../renta/nav/nav.component";


@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [CommonModule, ReactiveFormsModule, RouterLink, FooterComponent, NavComponent]
})

export class RegisterComponent {

  disableSubmitButton = false; // Agrega esta propiedad
  mismatchedPasswordConfirmation = false;
  mismatchedEmailConfirmation = false;

  FormUser = new FormGroup({
    'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'apellidos': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'telefono': new FormControl('', [Validators.required,Validators.minLength(10),Validators.pattern(/^[0-9]\d*$/)]),
    'CorreoElectronico': new FormControl('', [Validators.required, Validators.email]),
    'emailConfirm': new FormControl('', [Validators.required,Validators.email]),
    'Contraseña': new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/), Validators.minLength(8)]),
    'passwordConfirm': new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/), Validators.minLength(8)]),
    'provincia': new FormControl('', [Validators.required]),
    'terminos': new FormControl('', [Validators.required]),
    'Direccion': new FormControl('', [Validators.required,Validators.maxLength(300)]),
    'cedula': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]{10}$/)]),
    //'ruc': new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]{10}$/)]),
  });

  constructor(

    private _userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private validarcedulaService: ValidarcedulaService,


  ) { }

  onSubmit() {
    const user: User = {
      Cedula: this.FormUser.value.cedula ?? '',
      Nombre: this.FormUser.value.nombre ?? '',
      Apellido: this.FormUser.value.apellidos ?? '',
      CorreoElectronico: this.FormUser.value.CorreoElectronico ?? '',
      Contraseña: this.FormUser.value.Contraseña ?? '',
      Direccion: this.FormUser.value.Direccion ?? '',
      Telefono: this.FormUser.value.telefono ?? '',
    }
    if (this.FormUser.value.Contraseña !== this.FormUser.value.passwordConfirm) {
      this.mismatchedPasswordConfirmation = true;
      console.log("contraseña incorrecta");
    } else {
      this.mismatchedPasswordConfirmation = false;
    }

    if (this.FormUser.value.CorreoElectronico !== this.FormUser.value.emailConfirm) {
      this.mismatchedEmailConfirmation = true;
      console.log("correo incorrecto");
    } else {
      this.mismatchedEmailConfirmation = false;
      console.log("correo correcto");
    }

    if (this.mismatchedPasswordConfirmation || this.mismatchedEmailConfirmation) {
      return;
    }
    this._userService.singin(user).subscribe(data => {
      this.notificationService.notify('Registrado correctamente.', 2000);
      this.router.navigate(['/login'])
    })
  }
}
