import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-newpassword',
  standalone: true,
  imports: [CommonModule,RouterOutlet,HttpClientModule,RouterLink],
  templateUrl: './newpassword.component.html',
  styleUrl: './newpassword.component.css'
})
export class NewpasswordComponent {
  userLoginOn:boolean=false;
  constructor(private loginService:LoginService) { }


}
