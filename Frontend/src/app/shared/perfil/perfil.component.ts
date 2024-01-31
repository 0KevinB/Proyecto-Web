import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductService } from 'src/app/services/product.service';
import { Alquiler } from 'src/app/interfaces/alquiler';
import { catchError, forkJoin, switchMap, throwError } from 'rxjs';
import { NavComponent } from "../nav/nav.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-perfil',
    standalone: true,
    templateUrl: './perfil.component.html',
    styleUrl: './perfil.component.css',
    imports: [CommonModule, FormsModule, NavComponent, FooterComponent]
})
export class PerfilComponent implements OnInit {
  user: User = {};
  editedUser: Partial<User> = {};
  cedulaUsuario: string | null = null;
  editMode = false;
  historialPagos: any[] = [];
  rentaActual: any[] = [];
  bicicletaSeleccionada: any = [];
  alquileres: Alquiler[] = []
  detallesRenta: any;
  porcentaje: any;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private carritoService: CarritoService,
    private productService: ProductService,
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
    this.onGetAlquilerByCedula()
    this.getAlquiler();
  }

  getAlquiler() {
    this.carritoService.getAlquiler().subscribe(
      (data: any) => {
        this.detallesRenta = data;
        this.alquileres = this.detallesRenta.alquileres
        console.log(this.detallesRenta)
      },
      (error) => {
        this.notificationService.notify('Error al obtener detalles de renta');
      }
    );
  }

  enableEditMode(): void {
    this.editedUser = { ...this.user };
    this.editMode = true;
  }
  saveChanges(): void {
    this.userService.updateUserDetails(this.cedulaUsuario, this.editedUser).subscribe(
      () => {
        this.notificationService.notify('Cambios guardados correctamente', 2000);
        this.editMode = false;
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
  Logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/inicio']);
  }
  onGetAlquilerByCedula(): void {
    this.carritoService.getAlquilerByCedula(this.cedulaUsuario).subscribe(
      (historialPagos: any[]) => {
        const fechaActual = new Date();
        historialPagos.forEach(pago => {
          const bikeId = pago.BikeID;
          this.productService.getProductById(bikeId).subscribe(
            (bicicleta: any) => {
              pago.Modelo = bicicleta.Modelo;
            },
            error => {
              console.error('Error al obtener la información de la bicicleta:', error);
            }
          );
        });
        this.historialPagos = historialPagos;
        this.rentaActual = historialPagos.filter(pago => new Date(pago.FechaFin) > fechaActual);

      },
      error => {
        console.error('Error al obtener el historial de pagos:', error);
      }
    );
  }
  obtenerInformacionBicicleta(bikeId: number): void {
    this.productService.getProductById(bikeId).subscribe(
      (bicicleta: any) => {
        this.bicicletaSeleccionada = bicicleta;
        console.log('biciclet', this.bicicletaSeleccionada);
      },
      error => {
        console.error('Error al obtener la información de la bicicleta:', error);
      }
    );
  }

  calcularPorcentajeTranscurrido(fechaInicio: string, fechaFin: string): string {
    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinObj = new Date(fechaFin);
    const fechaActual = new Date();
    const duracionTotal = fechaFinObj.getTime() - fechaInicioObj.getTime();
    const tiempoTranscurrido = fechaActual.getTime() - fechaInicioObj.getTime();
    const porcentajeTranscurrido = (tiempoTranscurrido / duracionTotal) * 100;
    this.porcentaje = porcentajeTranscurrido.toFixed(2);
    console.log('porcentaje',this.porcentaje)

    return porcentajeTranscurrido.toFixed(2);
  }

}
