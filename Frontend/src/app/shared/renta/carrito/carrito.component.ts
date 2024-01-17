import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarritoItem } from 'src/app/interfaces/CarritoItem';
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
  }

  onAddToCart(): void {
    const cantidadHoras = this.carritoForm.get('cantidadHoras').value;
    const item: CarritoItem = {
      Cedula: this.cedula,
      Producto: this.producto,
      CantidadHoras: cantidadHoras,
      PrecioTotal: this.producto.PrecioPorHora * cantidadHoras,
    };
    this.carritoService.addToCart(item).subscribe(data => {
      console.log('data ', data);
    })
  }

}