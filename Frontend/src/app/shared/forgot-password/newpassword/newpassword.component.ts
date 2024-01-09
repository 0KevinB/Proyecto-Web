import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-newpassword',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, RouterLink, ReactiveFormsModule],
  templateUrl: './newpassword.component.html',
  styleUrl: './newpassword.component.css'
})


export class NewpasswordComponent {
  token: string = '';
  newPasswordForm: FormGroup;
  loading: boolean = false;  // Agregamos una bandera para manejar el estado de carga

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.newPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    if (this.newPasswordForm.valid) {
      const formValues = this.newPasswordForm.value;
      // Validar que las contraseñas coincidan
      if (formValues.newPassword !== formValues.confirmPassword) {
        this.notificationService.notify('Las contraseñas no coinciden.', 2000);
        // Puedes mostrar un mensaje de error al usuario
        return;
      }
      console.log('onSubmit triggered');
      console.log('Form Values:', formValues);
      console.log('Token:', this.token);

      this.loading = true;

      // Ahora intenta llamar al servicio
      this.userService.resetPassword(this.token, formValues.newPassword).subscribe(
        (response: any) => {
          this.notificationService.notify('Contraseña restrablecida con exito.', 2000);
          this.router.navigate(['/login']);
        },
        (error: any) => {
          this.notificationService.notify('Error al restrablecer la contraseña.', 2000);
          // Manejo de errores, puedes mostrar mensajes al usuario
        }
      ).add(() => this.loading = false);
    }
  }
}

