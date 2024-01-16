import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarritoItem } from 'src/app/interfaces/carritoItem';
import { Product } from 'src/app/interfaces/product';
import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  carritoForm: FormGroup | any;
  carrito: Product[] = [];
  cedula: string | any;
  producto: Product | any;

  constructor(
    private fb: FormBuilder,
    private carritoService: CarritoService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getCedulaUsuario().subscribe(cedula => {
      this.cedula = cedula;
    });
    this.carritoForm = this.fb.group({
      cantidadHoras: [1],
    });

    this.producto = this.carritoService.getProductoSeleccionado();
    console.log("Producto obtenido: ", this.producto);

    this.refreshCart();
  }

  refreshCart(): void {
    this.carritoService.getItems().subscribe((items: Product[]) => {
      this.carrito = items;
    });
  }

  onAddToCart(): void {
    const cantidadHoras = this.carritoForm.get('cantidadHoras').value;
    const item: CarritoItem = {
      Cedula: this.cedula,
      Producto: this.producto,
      CantidadHoras: cantidadHoras,
      PrecioTotal: this.producto.PrecioPorHora * cantidadHoras,
    };

    console.log('ITEM: ', item);
    this.carritoService.addToCart(item).subscribe(() => {
      this.refreshCart();
    });
    this.carritoForm.reset();
  }

  onClearCart(): void {
    this.carritoService.clearCart().subscribe(() => {
      this.refreshCart();
    });
  }

  getCarritoTotal(): number {
    return this.carrito.reduce((total, item) => total + item.PrecioPorHora * item.CantidadHoras, 0);
  }

  onReserve(product: Product): void {
    const cantidadHoras = this.carritoForm.get('cantidadHoras').value;
    const item: CarritoItem = {
      Cedula: this.cedula,
      Producto: product,
      CantidadHoras: cantidadHoras,
      PrecioTotal: product.PrecioPorHora * cantidadHoras,
    };

    this.carritoService.reserveProduct(item).subscribe(() => {
      this.refreshCart();
    });

    this.carritoForm.reset();
  }

}