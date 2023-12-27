import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})

export class ForgotPasswordComponent implements OnInit {
  fpForm: FormGroup;
  loading: boolean = false;

  constructor(
    private _userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.fpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void { }

  sendResetEmail() {
    if (this.fpForm.invalid) {
      return;
    }

    const email = this.fpForm.value.email;

    // Mostrar un spinner de carga mientras se envía la solicitud
    this.loading = true;

    // Enviando solo el email
    this._userService.sendResetEmail(email).subscribe({
      next: (data: any) => {
        console.log('Respuesta del servidor:', data);
        // Redirige a una página o muestra un mensaje al usuario, etc.
        this.router.navigate(['/mensaje-de-envio-exitoso']);
      },
      error: (error) => {
        console.error('Error al enviar el correo electrónico de restablecimiento:', error);
        // Detén el spinner de carga aquí si lo estás mostrando
        this.loading = false;
      }
    });
  }
}  