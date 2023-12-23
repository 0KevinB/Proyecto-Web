import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, NavComponent, HttpClientModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  userLoginOn: boolean = false;
  constructor(private loginService: LoginService,private router:Router) { }

/*   ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe();
  } */

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
        }
      }
    )
  }

  logout()
  {
    this.loginService.logout();
    this.router.navigate(['/inicio'])
  }


}
