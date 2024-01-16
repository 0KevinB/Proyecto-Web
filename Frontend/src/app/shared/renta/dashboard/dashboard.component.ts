import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { FilterService } from 'src/app/services/filter.service';
import { Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule, MatIconModule, RouterLink],
})
export class DashboardComponent implements OnInit {
  listProduct: Product[] = [];
  listProductUser: Product[] = [];
  filteredProducts: Product[] = [];
  serverBaseUrl = 'http://localhost:3001';
  token: string | null = null;
  opciones = [
    { nombre: 'Tradicional', checked: false },
    { nombre: 'Electrica', checked: false },
    { nombre: 'Montaña', checked: false },
    { nombre: 'Todas', checked: true },
  ];
  isAdmin: boolean = false;
  selectedFilter: string = 'Todas';
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
    this.getProductsUser().subscribe(() => {
      this.applyFilterOnInit();
    });
    this.token = localStorage.getItem('token');
    this._filterService.filter$.subscribe((data) => {
      console.log(data);
      this.applyFilter();
    });
  }
  filterBicycles(filterOption: string): void {
    this.selectedFilter = filterOption;
    if (this.isAdmin) {
      this.filteredProducts = this.listProduct.filter((product) => {
        if (filterOption === 'Todas') {
          return true;
        } else {
          return product.Tipo.toLowerCase() === filterOption.toLowerCase();
        }
      });
    } else {
      this.filteredProducts = this.listProductUser.filter((product) => {
        if (filterOption === 'Todas') {
          return true;
        } else {
          return product.Tipo.toLowerCase() === filterOption.toLowerCase();
        }
      });
    }
  }
  applyFilterOnInit() {
    if (this.isAdmin) {
      this.filteredProducts = this.listProduct.filter((product) => {
        return product.Modelo.toLowerCase().includes(this._filterService.getFilter().toLowerCase());
      });
    } else {
      this.filteredProducts = this.listProductUser.filter((product) => {
        return product.Modelo.toLowerCase().includes(this._filterService.getFilter().toLowerCase());
      });
    }
  }
  applyFilter() {
    if (this.isAdmin) {
      this.filteredProducts = this.listProduct.filter((product) => {
        return product.Modelo.toLowerCase().includes(this._filterService.getFilter().toLowerCase());
      });
    } else {
      this.filteredProducts = this.listProductUser.filter((product) => {
        return product.Modelo.toLowerCase().includes(this._filterService.getFilter().toLowerCase());
      });
    }
  }
  getProducts() {
    this._productService.getProductsWithImages().subscribe((data) => {
      this.listProduct = data;
    });
  }
  getProductsUser(): Observable<any> {
    return this._productService.getProductsWithImages().pipe(map((data) => {
      const dataFiltrada = data.filter((item) => {
        if (item.PropietarioBicicletas && item.PropietarioBicicletas.length > 0) {
          return item.PropietarioBicicletas.some((bicicleta: { Estado: boolean }) => bicicleta.Estado === true);
        }
        return false;
      });
      this.listProductUser = dataFiltrada;
    }));
  }
  isProductApproved(product: Product): boolean {
    return product.PropietarioBicicletas[0].Estado === 1;
  }
  getImageUrl(imageName: string): string {
    const token = localStorage.getItem('token');
    const tokenParam = token ? `?token=${token}` : '';
    return `${this.serverBaseUrl}/api/products/bikes/imagen/${imageName}${tokenParam}`;
  }
  createProduct(newProduct: Product) {
    this._productService.createProduct(newProduct).subscribe(createdProduct => {
      // Lógica adicional si es necesario
      this.getProducts(); // Recargar la lista después de crear un nuevo producto
    });
  }
  deleteProduct(productId: number) {
    if (productId !== undefined && productId !== null) {
      this._productService.deleteProduct(productId).subscribe(() => {
        this.getProducts();
        this.notificationService.notify('Producto eliminado correctamente', 2000);
      });
    } else {
      this.notificationService.notify('El ID del producto es indefinido o nulo.', 2000);
    }
  }
  approveBicycle(bikeId: number) {
    if (bikeId !== undefined) {
      this._productService.approveProduct(bikeId).subscribe(() => {
        this.getProducts(); // Recargar la lista después de aprobar la bicicleta
      });
    } else {
      this.notificationService.notify('El ID del producto es indefinido o nulo.', 2000);
    }
  }
  verMapa(bicicletaId: number): void {
    this.ubicacionService.getUbicacion(bicicletaId).subscribe(
      (ubicacion) => {
        const locationID = ubicacion[0].LocationID;
        this.router.navigate(['/mapa', bicicletaId]);
      },
      (error) => {
        console.error('Error al obtener la ubicación de la bicicleta:', error);
      }
    );
  }

  onReserve(product: Product): void {
    this.carritoService.setProductoSeleccionado(product)
  }
}