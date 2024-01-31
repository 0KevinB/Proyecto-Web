import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CarritoItem } from 'src/app/interfaces/CarritoItem';
import { Product } from 'src/app/interfaces/product';
import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from 'src/app/services/user.service';
import { FooterComponent } from "../../footer/footer.component";

@Component({
    selector: 'app-carrito',
    standalone: true,
    templateUrl: './carrito.component.html',
    styleUrl: './carrito.component.css',
    imports: [ReactiveFormsModule, CommonModule, FooterComponent]
})
export class CarritoComponent implements OnInit {
  carritoForm: FormGroup | any;
  cedula: string | any;
  producto: Product | any;
  serverBaseUrl = 'http://localhost:3001';

  constructor(
    private fb: FormBuilder,
    private carritoService: CarritoService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.getCedulaUsuario().subscribe(cedula => {
      this.cedula = cedula;
    });
    this.carritoForm = this.fb.group({
      cantidadHoras: [1],
    });

    this.producto = this.carritoService.getProductoSeleccionado();
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
    })
  }
  Logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/inicio']);
  }
  getImageUrl(imageName: string): string {
    const token = localStorage.getItem('token');
    const tokenParam = token ? `?token=${token}` : '';
    return `${this.serverBaseUrl}/api/products/bikes/imagen/${imageName}${tokenParam}`;
  }
}