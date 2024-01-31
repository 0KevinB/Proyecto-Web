import { Component, Input, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { icon, Map, marker, tileLayer, Marker } from 'leaflet';
import { Ubicacion } from 'src/app/interfaces/ubicacion';
import { CommonModule } from '@angular/common';
import { LatLngExpression } from 'leaflet';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FooterComponent]
})
export class MapaComponent implements OnInit {
  listUbicacion: Ubicacion[] = [];
  geo: any;
  map: any;
  bicicletaId: number = 0;
  currentRoute = this.route.snapshot.routeConfig?.path;
  isAdmin: boolean = false;
  ubicacionForm: FormGroup | any;
  modoEdicion: boolean = false;
  ubicacion: Partial<Ubicacion> = {};
  marcadorActual: Marker | null = null;
  latlng: any
  constructor(
    private PlacesService: PlacesService,
    private _ubicacionService: UbicacionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this._userService.getRolUsuario().subscribe((rol) => {
      this.isAdmin = rol === 2;
    });
    this.route.paramMap.subscribe((params) => {
      const bicicletaIdParam = params.get('bicicletaId');
      this.bicicletaId = bicicletaIdParam ? +bicicletaIdParam : 0;

      if (this.bicicletaId) {
        this._ubicacionService.getUbicacion(this.bicicletaId).subscribe(
          (ubicacion) => {
            this.listUbicacion = ubicacion;
            this.ubicacionForm.patchValue({
              NombreUbicacion: this.listUbicacion[0].NombreUbicacion,
              Direccion: this.listUbicacion[0].Direccion,
              Latitud: this.listUbicacion[0].Latitud,
              Longitud: this.listUbicacion[0].Longitud,
            });
          },
          (error) => {
            this.notificationService.notify(
              'Error al obtener la ubicación de la bicicleta',
              2000
            );
          }
        );
      } else {
        if (this.currentRoute !== 'agregar-bicicleta') {
          this._ubicacionService.getUbicacion().subscribe(
            (ubicaciones) => {
              this.listUbicacion = ubicaciones;
              this.marcadores();
            },
            (error) => {
              this.notificationService.notify(
                'Error al obtener la ubicación de la bicicleta',
                2000
              );
            }
          );
        }
      }
    });
    setTimeout(() => {
      this.geo = this.PlacesService.useLocation;
    }, 2000);

    this.ubicacionForm = this.formBuilder.group({
      NombreUbicacion: ['', Validators.required],
      Direccion: ['', Validators.required],
      Latitud: ['', Validators.required],
      Longitud: ['', Validators.required],
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.map = new Map('map').setView(
        this.geo,
        13
      );
      tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.map.on('click', (e: any) => {
        const currentRoute = this.router.url;

        if (!currentRoute.startsWith('/mapa') || this.isAdmin) {
          if (this.router.url !== '/mapa') {

            if (this.marcadorActual) {
              this.map.removeLayer(this.marcadorActual);
            }
            this.latlng = e.latlng;

            this.marcadorActual = new Marker(this.latlng, {
              icon: L.icon({
                iconUrl: './assets/img/pinblue.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
              }),
            });
            this.marcadorActual.addTo(this.map);
            this._ubicacionService.obtenerUbicacionAlClic(this.latlng);
          }
        }
      });
    }, 2000);
    this.marcadores();
  }
  marcadores() {
    setTimeout(() => {
      for (let i = 0; i < this.listUbicacion.length; i++) {
        const nombre = this.listUbicacion[i].NombreUbicacion;
        const direccion = this.listUbicacion[i].Direccion;
        const latitude = this.listUbicacion[i].Latitud;
        const longitude = this.listUbicacion[i].Longitud;
        if (latitude !== undefined && longitude !== undefined) {
          const latLng: LatLngExpression = [latitude, longitude];
          const myIcon = icon({ iconUrl: './assets/img/pinblue.png', iconSize: [34, 42] });
          marker(latLng, { icon: myIcon }).addTo(this.map).bindPopup("<b>" + 'Lugar : ' + nombre + "<br>" + 'Dirección : ' + direccion + "</b>").openPopup;
        }
      }
    }, 2000);
  }
  ubicar() {
    setTimeout(() => {
      const myIcon = icon({ iconUrl: './assets/img/pin.png', iconSize: [34, 42] });
      marker(this.geo, { icon: myIcon }).addTo(this.map).bindPopup("<strong>Esta es mi ubicación</strong>").openPopup;
    }, 2000);
  }
  recargar() {
    location.reload();
  }
  getUbicacions() {
    this._ubicacionService.getUbicacion().subscribe(data => {
      this.listUbicacion = data;
    });
  }
  Logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/inicio']);
  }
  saveChanges(): void {
    if (this.ubicacionForm.valid) {
      this.ubicacionForm.patchValue({
        Latitud: this.latlng.lat,
        Longitud: this.latlng.lng,
      });
      const data = this.ubicacionForm.value;
      this._ubicacionService.updateUbicacionDetails(this.listUbicacion[0].LocationID, data)
        .subscribe(
          () => {
            this.notificationService.notify('Ubicación actualizada correctamente');
          },
          (error) => {
            this.notificationService.notify('Error al actualizar la ubicación:');
          }
        );
    }
  }
  toggleEditMode(): void {
    this.modoEdicion = !this.modoEdicion;
  }
}