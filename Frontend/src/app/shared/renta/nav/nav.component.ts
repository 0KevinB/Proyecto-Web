import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, NavComponent, HttpClientModule, RouterLink,
    MatMenuModule, MatButtonModule,MatIconModule,
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLoginOn: boolean = false;
  showDropdown: boolean = false;

  constructor(private router: Router) { }
  toggleDropdown(event: Event) {
    event.preventDefault();  // Evita la acción predeterminada, por ejemplo, seguir el enlace en la imagen
    event.stopPropagation();  // Evita que el evento llegue a otros elementos, como el documento
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown() {
    this.showDropdown = false;
  }

  ngOnInit(): void {
  }

  Logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/inicio']);
  }


}