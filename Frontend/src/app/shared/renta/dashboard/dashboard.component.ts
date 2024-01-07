import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { FilterService } from 'src/app/services/filter.service';
import { Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule],
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
  selectedFilter: string = 'Todas'; // la opción de filtro por defecto

  constructor(
    private _productService: ProductService,
    private _userService: UserService,
    private _filterService: FilterService
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

    this.filteredProducts = this.listProductUser.filter((product) => {
      if (filterOption === 'Todas') {
        return true; 
      } else {
        return product.Tipo.toLowerCase() === filterOption.toLowerCase();
      }
    });
  }


  applyFilterOnInit() {
    this.filteredProducts = this.listProductUser.filter((product) => {
      return product.Modelo.toLowerCase().includes(this._filterService.getFilter().toLowerCase());
    });
  }
  applyFilter() {
    this.filteredProducts = this.listProductUser.filter((product) => {
      return product.Modelo.toLowerCase().includes(this._filterService.getFilter().toLowerCase());
    });
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
  updateProduct(productId: number, updatedProduct: Product) {
    this._productService.updateProduct(productId, updatedProduct).subscribe(() => {
      // Lógica adicional si es necesario
      this.getProducts(); // Recargar la lista después de actualizar el producto
    });
  }
  deleteProduct(productId: number) {
    if (productId !== undefined && productId !== null) {
      this._productService.deleteProduct(productId).subscribe(() => {
        this.getProducts();
      });
    } else {
      console.error('El ID del producto es indefinido o nulo.');
    }
  }
  approveBicycle(bikeId: number) {
    console.log('BikeID:', bikeId); // Agrega este log para verificar el valor

    if (bikeId !== undefined) {
      this._productService.approveProduct(bikeId).subscribe(() => {
        // Lógica adicional si es necesario
        this.getProducts(); // Recargar la lista después de aprobar la bicicleta
      });
    } else {
      console.error('ID de bicicleta indefinido');
    }
  }
}
