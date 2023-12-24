import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from "../nav/nav.component";
import { NewpasswordComponent } from "../newpassword/newpassword.component";
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from 'src/app/shared/register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule, LoginComponent, NavComponent, NewpasswordComponent, HttpClientModule, RegisterComponent]
})
export class LoginComponent implements OnInit {
  CorreoElectronico: string = ''
  Contraseña: string = ''

  ngOnInit(): void {
  }

}
