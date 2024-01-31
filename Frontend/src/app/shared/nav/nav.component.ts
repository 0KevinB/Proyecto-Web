import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, NavComponent, HttpClientModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLoginOn: boolean = true;
  constructor(private router: Router, private _AuthService: AuthService) { }

  ngOnInit(): void {
    this.userLoginOn = this._AuthService.isLoggedIn();
  }

  logout() {
    this._AuthService.logout();
    this.userLoginOn = this._AuthService.isLoggedIn();

    this.router.navigate(['/inicio'])
  }
}
