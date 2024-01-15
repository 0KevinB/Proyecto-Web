import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UbicacionService } from 'src/app/services/ubicacion.service';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.css'
})
export class UbicacionComponent {
  ubicacionForm: FormGroup | any;
  constructor(private formBuilder: FormBuilder, private ubicacionSharedService: UbicacionService) { }
  ngOnInit(): void {
    this.ubicacionForm = this.formBuilder.group({
      nombreUbicacion: ['', Validators.required],
      direccion: ['', Validators.required],
    });
    // Suscríbete al evento de ubicación compartida
    this.ubicacionSharedService.ubicacionForm.subscribe(coordenadas => {
      // Actualiza el formulario de ubicación con las coordenadas
      this.ubicacionForm.patchValue({
        latitud: coordenadas.latitud,
        longitud: coordenadas.longitud
      });
    });
  }
}

