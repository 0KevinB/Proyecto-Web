import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { FilterService } from 'src/app/services/filter.service';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { NavComponent } from '../nav/nav.component';
import { Alquiler } from 'src/app/interfaces/alquiler';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css',
  imports: [NavComponent]
})
export class EstadisticasComponent {
  listProduct: Product[] = [];
  listProductUser: Product[] = [];
  filteredProducts: Product[] = [];
  serverBaseUrl = 'http://localhost:3001';
  token: string | null = null;
  detallesRenta: any;
  opciones = [
    { nombre: 'Tradicional', checked: false },
    { nombre: 'Electrica', checked: false },
    { nombre: 'Montaña', checked: false },
    { nombre: 'Todas', checked: true },
  ];
  isAdmin: boolean = false;
  editMode: boolean = false;
  selectedFilter: string = 'Todas';
  filterPost = '';
  bicicletaEditada: { BikeID: number; Modelo: string; Tipo: string; Estado: string; imagenReferencia: any; PrecioPorHora: number; Descripcion: string; PropietarioBicicletas: any; CantidadHoras: number; FechaInicio: Date; FechaFinalizacion: Date; } | any;
  constructor(
    private _productService: ProductService,
    private _userService: UserService,
    private _filterService: FilterService,
    private notificationService: NotificationService,
    private ubicacionService: UbicacionService,
    private router: Router,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    this._userService.getRolUsuario().subscribe((rol) => {
      this.isAdmin = rol === 2;
    });
    this.getProducts();
    this.getProductsRentados();
    this.getAlquiler();
    this.token = localStorage.getItem('token');
    
  }

  getProducts() {
    this._productService.getProductsWithImages().subscribe((data) => {
      this.listProduct = data;
      console.log(this.listProduct)
    });
  }

  porcentaje = ''

  calcularPorcentajeBicicletasRentadas() {
    const totalBicicletas = this.listProduct.length;
    const bicicletasRentadas = this.detallesRenta.length;

    const porcentajeRentadas = (bicicletasRentadas / totalBicicletas) * 100;
    this.porcentaje = porcentajeRentadas.toFixed(2)
    console.log('porcentaje',this.porcentaje)
  }
  productosRentados  = 0
  getProductsRentados() {
    this._productService.getRentadas().subscribe((data) => {
      this.detallesRenta = data;
      this.productosRentados = this.detallesRenta.length
      this.calcularPorcentajeBicicletasRentadas();
    },
      (error) => {
        this.notificationService.notify('Error al obtener detalles de renta');
      }
    );
  }

  alquileres: Alquiler[] = []
  getAlquiler() {
    this.carritoService.getAlquiler().subscribe(
      (data: any) => {
        this.detallesRenta = data;
        this.alquileres = this.detallesRenta.alquileres
        this.getGanancias()

      },
      (error) => {
        this.notificationService.notify('Error al obtener detalles de renta');
      }
    );
  }

  ganancias = 0

  getGanancias() {
    for (let i = 0; i < this.alquileres.length; i++) {
      this.ganancias += this.alquileres[i].MontoTotal * 1.0
    }
  }

  getImageUrl(imageName: string): string {
    const token = localStorage.getItem('token');
    const tokenParam = token ? `?token=${token}` : '';
    return `${this.serverBaseUrl}/api/products/bikes/imagen/${imageName}${tokenParam}`;
  }
}