import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { FilterPipe } from "../../../pipes/filter.pipe";
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FilterPipe]
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
    { nombre: 'Todas', checked: true }
  ];
  isAdmin: boolean = false;

  constructor(
    private _productService: ProductService,
    private _userService: UserService,
    private _filterService: FilterService // Agrega el servicio de filtro a la lista de servicios inyectados
  ) { }

  ngOnInit(): void {
    this._userService.getRolUsuario().subscribe((rol) => {
      this.isAdmin = rol === 2;
      this.getProducts();
      this.getProductsUser();
    });

    // Obtén el token del Local Storage
    this.token = localStorage.getItem('token');

    // Suscríbete a los cambios en el servicio de filtro
    this._filterService.filter$.subscribe(() => {

      this.applyFilter();
    });
  }

  getProducts() {
    this._productService.getProductsWithImages().subscribe((data) => {
      this.listProduct = data;
    });
  }
  getProductsUser() {
    this._productService.getProductsWithImages().subscribe((data) => {
      // Filtrar las bicicletas con Estado: true en el arreglo principal
      const dataFiltrada = data.filter(item => {
        if (item.PropietarioBicicletas && item.PropietarioBicicletas.length > 0) {
          // Verificar si hay al menos una bicicleta con Estado: true en PropietarioBicicletas
          return item.PropietarioBicicletas.some((bicicleta: { Estado: boolean; }) => bicicleta.Estado === true);
        }
        return false; // Excluir elementos que no tienen PropietarioBicicletas
      });
      this.listProductUser = dataFiltrada;
    });
  }

  private applyFilter(): void {
    const filter = this._filterService.getFilter().toLowerCase();

    if (!filter) {
      this.filteredProducts = this.listProduct;
    } else {
      // Filtrar productos aprobados según el texto de búsqueda (insensible a mayúsculas y minúsculas)
      this.filteredProducts = this.listProduct.filter(
        (product) => {
          const cleanedModelo = product.Modelo.trim().toLowerCase(); // Limpiar la cadena antes de la comparación
          console.log('Modelo:', cleanedModelo);
          console.log('Filtro:', filter);
          return cleanedModelo.includes(filter);
        }
      );
    }

    console.log('Productos filtrados:', this.filteredProducts);
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
