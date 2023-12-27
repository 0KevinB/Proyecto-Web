import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [],
  templateUrl: './logout-modal.component.html',
  styleUrl: './logout-modal.component.css'
})
export class LogoutModalComponent {
  @Output() logoutConfirmed = new EventEmitter();

  constructor(private authService: AuthService) { }

  confirmLogout(): void {
    // Llama al método de logout del servicio de autenticación
    this.authService.logout();

    // Emite el evento para indicar que el logout ha sido confirmado
    this.logoutConfirmed.emit();
  }
}
