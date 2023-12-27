import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LogoutModalComponent } from './../logout-modal/logout-modal.component'

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, NavComponent, HttpClientModule, RouterLink,
    LogoutModalComponent,],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLoginOn: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // Puedes agregar lógica para verificar el estado de autenticación y actualizar userLoginOn
    // this.userLoginOn = this.authService.isLoggedIn();
  }

  logout() {
    // Llama al método de logout del servicio de autenticación
    this.authService.logout();

    // Redirige al usuario a la página de inicio o a donde prefieras después del logout
    this.router.navigate(['/inicio']);
  }

  openLogoutModal(): void {
    console.log('Abrir modal de logout');

  }

  onLogoutConfirmed(): void {
    // Lógica adicional después de que el usuario confirma el logout
    // ...
  }
}