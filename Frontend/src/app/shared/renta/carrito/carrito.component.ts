import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { CarritoService } from 'src/app/services/carrito.service';

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

  constructor(
    private fb: FormBuilder,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    // Inicializar el formulario reactivo
    this.carritoForm = this.fb.group({
      cantidadHoras: [1], // Valor por defecto, puedes ajustar según tus necesidades
    });

    // Obtener el carrito actual del usuario al iniciar el componente
    this.refreshCart();
  }

  refreshCart(): void {
    // Obtener el carrito actual del servicio
    // Suponiendo que tienes un método en tu servicio para obtener el carrito del usuario actual
    // Ajusta según la implementación real de tu servicio
    this.carritoService.getItems().subscribe((items: Product[]) => {
      this.carrito = items;
    });
  }

  onAddToCart(product: Product): void {
    const cantidadHoras = this.carritoForm.get('cantidadHoras').value;

    // Crear un nuevo producto con la cantidad de horas seleccionadas
    const item: Product = {
      ...product,
      CantidadHoras: cantidadHoras,
      // Puedes ajustar la lógica para calcular el precio total aquí si es necesario
    };

    // Añadir al carrito a través del servicio
    this.carritoService.addToCart(item).subscribe(() => {
      // Refrescar el carrito después de añadir un elemento
      this.refreshCart();
    });

    // Limpiar el formulario después de añadir al carrito
    this.carritoForm.reset();
  }

  onClearCart(): void {
    // Vaciar el carrito a través del servicio
    this.carritoService.clearCart().subscribe(() => {
      // Refrescar el carrito después de vaciarlo
      this.refreshCart();
    });
  }
}