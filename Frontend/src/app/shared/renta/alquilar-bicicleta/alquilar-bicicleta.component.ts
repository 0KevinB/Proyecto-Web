import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alquilar-bicicleta',
  standalone: true,
  imports: [],
  templateUrl: './alquilar-bicicleta.component.html',
  styleUrl: './alquilar-bicicleta.component.css'
})
export class AlquilarBicicletaComponent {
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
  
  constructor(private fb: FormBuilder,
  ) {

  }
}
