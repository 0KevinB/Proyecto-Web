import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { product_add } from 'src/app/interfaces/product_add.';
import { NavComponent } from "../../renta/nav/nav.component";
import { FooterComponent } from "../../footer/footer.component";
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { UbicacionComponent } from "../ubicacion/ubicacion.component";
import { MapaComponent } from "../../mapa/mapa.component";
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { Ubicacion } from 'src/app/interfaces/ubicacion';

@Component({
  selector: 'app-alquilar-bicicleta',
  standalone: true,
  templateUrl: './alquilar-bicicleta.component.html',
  styleUrl: './alquilar-bicicleta.component.css',
  imports: [ReactiveFormsModule, NavComponent, FooterComponent, RouterLink, UbicacionComponent, MapaComponent]
})

export class AlquilarBicicletaComponent {
  @ViewChild(UbicacionComponent) ubicacionComponent: UbicacionComponent | undefined;

  bicicletaForm: FormGroup | any;
  cedulaUsuario: string | null = null;
  ubicacionData: FormGroup | any;

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private userService: UserService,
    private router: Router,
    private ubicacionService: UbicacionService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.userService.getCedulaUsuario().subscribe(cedula => {
      this.cedulaUsuario = cedula;
    });

    this.bicicletaForm = this.formBuilder.group({
      modelo: ['', Validators.required],
      tipo: ['', Validators.required],
      estado: ['', Validators.required],
      precioPorHora: ['', Validators.required],
      descripcion: [''],
      imagenReferencia: [null],
    });

    this.ubicacionService.ubicacion$.subscribe((data) => {
      this.ubicacionData = data;
      console.log('iniittttt', this.ubicacionData);
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.bicicletaForm.patchValue({
        imagenReferencia: file
      });
      reader.readAsDataURL(file);
    }
  }

  guardarBicicleta() {
    if (this.bicicletaForm.valid && this.cedulaUsuario !== null) {
      const product: product_add = {
        Modelo: this.bicicletaForm.value.modelo,
        Tipo: this.bicicletaForm.value.tipo,
        Estado: this.bicicletaForm.value.estado,
        imagenReferencia: this.bicicletaForm.value.imagenReferencia,
        PrecioPorHora: this.bicicletaForm.value.precioPorHora,
        Descripcion: this.bicicletaForm.value.descripcion,
      }

      this.productService.createBicycleForUser(this.cedulaUsuario, product).subscribe(
        (respuesta) => {
          const bikeId = respuesta.BikeID;
          const ubicacion: Ubicacion = {
            NombreUbicacion: this.ubicacionData.nombreUbicacion,
            Latitud: this.ubicacionData.latitud,
            Longitud: this.ubicacionData.longitud,
            Direccion: this.ubicacionData.direccion,
          };

          this.productService.bicicleta_ubicacion(bikeId, ubicacion).subscribe(
            () => {
              this.notificationService.notify('Bicicleta agregada con éxito, espere confirmación del administrador.', 2000);
              this.router.navigate(['/catalogo']);
            },
            (error) => {
              this.notificationService.notify('Algo salió mal al asignar la ubicación, intente más tarde.', 2000);
            }
          );
        },
        (error) => {
          this.notificationService.notify('Algo salió mal al insertar la bicicleta, intente más tarde.', 2000);
        }
      );
    }
  }

}