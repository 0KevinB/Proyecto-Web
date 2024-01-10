import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  user: User = {};
  cedulaUsuario: string | null = null;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Obtén la cédula del usuario al inicializar el componente
    this.userService.getCedulaUsuario().subscribe(cedula => {
      this.cedulaUsuario = cedula;
    });
    this.userService.getUserDetails(this.cedulaUsuario).subscribe(
      (user) => {
        this.user = user;
        console.log("datos: ", user)
      },
      (error) => {
        console.error(error);
      }
    );
  }
}