import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { product_add } from 'src/app/interfaces/product_add.';
import { NavComponent } from "../../renta/nav/nav.component";
import { FooterComponent } from "../../footer/footer.component";
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-alquilar-bicicleta',
  standalone: true,
  templateUrl: './alquilar-bicicleta.component.html',
  styleUrl: './alquilar-bicicleta.component.css',
  imports: [ReactiveFormsModule, NavComponent, FooterComponent, RouterLink
    ,]
})

export class AlquilarBicicletaComponent {
  bicicletaForm: FormGroup | any;
  cedulaUsuario: string | null = null;

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    // Obtén la cédula del usuario al inicializar el componente
    this.userService.getCedulaUsuario().subscribe(cedula => {
      this.cedulaUsuario = cedula;
    });

    // Inicializa el formulario
    this.bicicletaForm = this.formBuilder.group({
      modelo: ['', Validators.required],
      tipo: ['', Validators.required],
      estado: ['', Validators.required],
      precioPorHora: ['', Validators.required],
      descripcion: [''],
      imagenReferencia: [null]
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
          this.notificationService.notify('Bicicleta agregada con exito, espere confirmacion del administrador.', 2000);
          this.router.navigate(['/catalogo']);
        },
        (error) => {
          this.notificationService.notify('Algo salió mal, intente más tarde.', 2000);
        }
      );

    }
  }
}