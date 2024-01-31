import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, NavComponent, HttpClientModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLoginOn: boolean = true;
  isAdmin: boolean = false;

  constructor(private router: Router, private _AuthService: AuthService, private userServices: UserService) { }

  ngOnInit(): void {
    this.userLoginOn = this._AuthService.isLoggedIn();
    this.userServices.getRolUsuario().subscribe((rol) => {
      this.isAdmin = rol === 2;
    })
  }

  logout() {
    this._AuthService.logout();
    this.userLoginOn = this._AuthService.isLoggedIn();

    this.router.navigate(['/inicio'])
  }
}
