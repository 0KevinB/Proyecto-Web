import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from "../../shared/nav/nav.component";
import { NewpasswordComponent } from "../../shared/newpassword/newpassword.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [CommonModule, RouterOutlet, ReactiveFormsModule, LoginComponent,NavComponent, NewpasswordComponent,HttpClientModule]
})
export class LoginComponent implements OnInit {
  loginError:string="";
  loginForm=this.formBuilder.group({
    email:['correo@gmail.com',[Validators.required,Validators.email]],
    password: ['123',Validators.required],
  })
userLoginOn: any;
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.controls.email;
  }

  get password()
  {
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
      this.loginError="";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError=errorData;
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        }
      })

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }

  nwpass(){
    this.loginService.logout();
    this.router.navigate(['/forgot-password'])
  }

}
