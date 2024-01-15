import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UbicacionService } from 'src/app/services/ubicacion.service';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.css'
})
export class UbicacionComponent implements OnInit {
  ubicacionForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private ubicacionSharedService: UbicacionService) {
    this.ubicacionForm = this.formBuilder.group({
      nombreUbicacion: ['', Validators.required],
      direccion: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.ubicacionForm = this.formBuilder.group({
      nombreUbicacion: ['', Validators.required],
      direccion: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
    });

    this.ubicacionSharedService.ubicacionForm.subscribe(coordenadas => {
      this.ubicacionForm?.patchValue({
        nombreUbicacion: this.ubicacionForm?.get('nombreUbicacion')?.value,
        direccion: this.ubicacionForm?.get('direccion')?.value,
        latitud: coordenadas?.lat,
        longitud: coordenadas?.lng,
      });
      this.ubicacionSharedService.setUbicacion(this.ubicacionForm.value);
    });
  }

}

