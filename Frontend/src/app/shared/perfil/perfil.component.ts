import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  user: User = {};
  editedUser: Partial<User> = {};
  cedulaUsuario: string | null = null;
  editMode = false;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.userService.getCedulaUsuario().subscribe(cedula => {
      this.cedulaUsuario = cedula;
    });

    this.userService.getUserDetails(this.cedulaUsuario).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        this.notificationService.notify('Algo salió mal, intente más tarde.', 2000);
      }
    );
  }

  enableEditMode(): void {
    // Copia los datos del usuario a editedUser
    this.editedUser = { ...this.user };
    this.editMode = true;
  }

  saveChanges(): void {
    // Realiza la solicitud de actualización al servicio
    this.userService.updateUserDetails(this.cedulaUsuario, this.editedUser).subscribe(
      () => {
        this.notificationService.notify('Cambios guardados correctamente', 2000);
        this.editMode = false;
        // Actualiza los datos del usuario después de guardar los cambios
        this.userService.getUserDetails(this.cedulaUsuario).subscribe(
          (user) => {
            this.user = user;
          },
          (error) => {
            this.notificationService.notify('Error al cargar los datos del usuario', 2000);
          }
        );
      },
      (error) => {
        this.notificationService.notify('Error al guardar cambios', 2000);
      }
    );
  }
}