import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, NavComponent, HttpClientModule, RouterLink,
    MatMenuModule, MatButtonModule, MatIconModule, FormsModule
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLoginOn: boolean = false;
  showDropdown: boolean = false;
  filterPost = '';

  constructor(private router: Router, private filterService: FilterService) { }
  toggleDropdown(event: Event) {
    event.preventDefault();  // Evita la acción predeterminada, por ejemplo, seguir el enlace en la imagen
    event.stopPropagation();  // Evita que el evento llegue a otros elementos, como el documento
    this.showDropdown = !this.showDropdown;
  }

  onSearchChange(): void {
    this.filterService.setFilter(this.filterPost);
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