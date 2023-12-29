import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  listProduct: Product[] = [];
  serverBaseUrl = 'http://localhost:3001';
  token: string | null = null;

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    // Obtén el token del Local Storage
    this.token = localStorage.getItem('token');
    this.getProducts();
  }

  getProducts() {
    this._productService.getProductsWithImages().subscribe(data => {
      console.log('Datos recibidos:', data);
      this.listProduct = data;
    });
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

}