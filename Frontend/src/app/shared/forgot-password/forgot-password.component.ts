import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

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
    private router: Router,
    private notificationService: NotificationService
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
    this.loading = true;

    // Enviando solo el email
    this._userService.sendResetEmail(email).subscribe({
      next: (data: any) => {
        this.notificationService.notify('Correo enviado exitosamente.', 2000);
        // Redirige a una página o muestra un mensaje al usuario, etc.
        this.router.navigate(['/mensaje-de-envio-exitoso']);
      },
      error: (error) => {
        this.notificationService.notify('No se encontro el correo, intente más tarde.', 2000);
        // Detén el spinner de carga aquí si lo estás mostrando
        this.loading = false;
      }
    });
  }
}  