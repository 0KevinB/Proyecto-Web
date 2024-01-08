import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FooterComponent]
})


export class RegisterComponent {

  public myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellidos: ['', [Validators.required, Validators.minLength(2)]],
    CorreoElectronico: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.minLength(10)]],
    emailConfirm: ['', [Validators.required]],
    Contraseña: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    terminos: ['', [Validators.required]],
    Direccion: ['', [Validators.required]],

    cedula: ['', [Validators.required]],
  });

  constructor(
    private _userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService : NotificationService
  ) { }

  isValidField(field: string) {
    const control = this.myForm.controls[field];
    return control ? control.valid && control.touched : false;
  }


  onSubmit() {
    const user: User = {
      Cedula: this.myForm.value.cedula,
      Nombre: this.myForm.value.nombre,
      Apellido: this.myForm.value.apellidos,
      CorreoElectronico: this.myForm.value.CorreoElectronico,
      Contraseña: this.myForm.value.Contraseña,
      Direccion: this.myForm.value.Direccion,
      Telefono: this.myForm.value.telefono,
    }

    if (this.myForm.value.Contraseña != this.myForm.value.passwordConfirm ||
      this.myForm.value.CorreoElectronico != this.myForm.value.emailConfirm
    ) {
      return
    }
    this._userService.singin(user).subscribe(data => {
      this.notificationService.notify('Registrado correctamente.', 2000);
      this.router.navigate(['/login'])
    })

  }

}