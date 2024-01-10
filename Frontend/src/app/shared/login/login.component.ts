import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavComponent } from "../lamding/nav/nav.component";
import { NewpasswordComponent } from "../forgot-password/newpassword/newpassword.component";
import { RegisterComponent } from 'src/app/shared/register/register.component';
import { User } from 'src/app/interfaces/user';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterLink, LoginComponent, NavComponent,
    NewpasswordComponent, RegisterComponent, CommonModule,
    ReactiveFormsModule, 
  ]
})

export class LoginComponent implements OnInit {
  CorreoElectronico: string = ''
  Contraseña: string = ''
  loading: boolean = false;
  loginForm: FormGroup;

  constructor(
    private _userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  login() {
    {
      if (this.loginForm.invalid) {
        return;
      }

      this.CorreoElectronico = this.loginForm.value.email;
      this.Contraseña = this.loginForm.value.password;
      // Campos vacíos
      if (this.CorreoElectronico === '' || this.Contraseña === '') {
        this.notificationService.notify('Por favor, completa todos los campos.');
        return;
      }

      // Body
      const user: User = {
        CorreoElectronico: this.CorreoElectronico,
        Contraseña: this.Contraseña
      }
      console.log('Datos a enviar:', user);

      this.loading = true;
      this._userService.login(user).subscribe({
        next: (data: any) => {
          this.router.navigate(['/catalogo'])
          localStorage.setItem('token', data)
        }, error: (error) => {
          this.notificationService.notify('Credenciales incorrectas. Por favor, intenta de nuevo.', 2000);
        },
      })
    }

  }

}