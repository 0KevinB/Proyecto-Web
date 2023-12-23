import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/auth/validators.service';
import { EmailValidator } from 'src/app/services/auth/email-validator.service';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { CedulaValidatorService } from 'src/app/services/auth/cedula-validator';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FooterComponent]
})
export class RegisterComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    apellidos: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.minLength(10)]],
    emailConfirm: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    terminos: ['', [Validators.required]],
    codigoPostal: ['', [Validators.required]],

    cedula: ['', [Validators.required]],  // Agrega la validación según tus requisitos para la cédula
    // ... otros campos
  });

  constructor(
    private fb: FormBuilder,
    private emailValidator: EmailValidator,
    private cedulaValidator: CedulaValidatorService,
    private service: UsersService
  ) { }

  isValidField(field: string) {
    const control = this.myForm.controls[field];
    return control ? control.valid && control.touched : false;
  }


  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      // Realiza cualquier lógica adicional al enviar el formulario
      console.log('Formulario válido. Datos:', this.myForm.value);
      this.service.signup(this.myForm.value)
    }
  }

}