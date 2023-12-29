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
  listProduct: Product[] = []
  sanitizer: any;
  serverBaseUrl = 'http://localhost:3001'; // Reemplaza con la URL base de tu servidor

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      console.log('Datos recibidos:', data);
      this.listProduct = data;
    });
  }


  createProduct(newProduct: Product) {
    this._productService.createProduct(newProduct).subscribe(createdProduct => {
      // Lógica adicional si es necesario
      this.getProducts(); // Recargar la lista después de crear un nuevo producto
    });
  }
  // Método para obtener la URL segura de la imagen
  getImageUrl(imageName: string): string {
    // Usa el nombre de la imagen directamente, ya que ya contiene la ruta completa
    return `http://localhost:3001/imagenes/${imageName}`;
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