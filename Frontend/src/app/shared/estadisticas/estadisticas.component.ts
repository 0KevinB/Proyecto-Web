import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { NavComponent } from '../nav/nav.component';
import { Alquiler } from 'src/app/interfaces/alquiler';
import { Chart } from 'chart.js/auto';
import { User } from 'src/app/interfaces/user';
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css',
  imports: [NavComponent, FooterComponent, CommonModule, RouterLink]
})
export class EstadisticasComponent {
  listProduct: Product[] = [];
  listProductUser: Product[] = [];
  filteredProducts: Product[] = [];
  serverBaseUrl = 'http://localhost:3001';
  token: string | null = null;
  detallesRenta: any;
  opciones = [
    { nombre: 'Tradicional', checked: false },
    { nombre: 'Electrica', checked: false },
    { nombre: 'Montaña', checked: false }
  ];
  isAdmin: boolean = false;
  editMode: boolean = false;
  usuarios: any[] = []
  usuariosCreadosPorFecha: any[] = [];
  public chart: Chart | any;
  constructor(
    private _productService: ProductService,
    private _userService: UserService,
    private notificationService: NotificationService,
    private carritoService: CarritoService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this._userService.getRolUsuario().subscribe((rol) => {
      this.isAdmin = rol === 2;
      if (!this.isAdmin) {
        this.router.navigate(['/inicio']);
      }
    });
    this.getProducts()
    this.getProductsRentados();
    this.getAlquiler();
    this.token = localStorage.getItem('token');

    this._userService.getUsers().subscribe((data) => {
      this.usuarios = data
      this.procesarUsuariosPorFecha();
    });
  }
  porcentajeEléctricas = 0
  porcentajeTradicional = 0
  porcentajeMontaña = 0

  getProducts() {
    this._productService.getProductsWithImages().subscribe((data) => {
      this.listProduct = data;

      // Mapear BikeID a Tipo de bicicleta
      const bikeIdToTypeMap = new Map();
      this.listProduct.forEach(product => {
        bikeIdToTypeMap.set(product.BikeID, product.Tipo);
      });

      // Clasificar alquileres por tipo de bicicleta
      const alquileresEléctricas = this.alquileres.filter(alquiler => bikeIdToTypeMap.get(alquiler.BikeID) === "Eléctrica");
      const alquileresTradicional = this.alquileres.filter(alquiler => bikeIdToTypeMap.get(alquiler.BikeID) === "Tradicional");
      const alquileresMontaña = this.alquileres.filter(alquiler => bikeIdToTypeMap.get(alquiler.BikeID) === "Montaña");

      // Calcular porcentajes
      const totalAlquileres = this.alquileres.length;

      // Verificar si hay al menos un alquiler para evitar divisiones por cero
      if (totalAlquileres > 0) {
        this.porcentajeEléctricas = (alquileresEléctricas.length / totalAlquileres) * 100;
        this.porcentajeTradicional = (alquileresTradicional.length / totalAlquileres) * 100;
        this.porcentajeMontaña = (alquileresMontaña.length / totalAlquileres) * 100;
        this.generatePieChart();

      } else {
      }
    });
  }

  porcentaje = ''

  calcularPorcentajeBicicletasRentadas() {
    const totalBicicletas = this.listProduct.length;
    const bicicletasRentadas = this.detallesRenta.length;

    const porcentajeRentadas = (bicicletasRentadas / totalBicicletas) * 100;
    this.porcentaje = porcentajeRentadas.toFixed(2)
  }

  productosRentados = 0
  getProductsRentados() {
    this._productService.getRentadas().subscribe((data) => {
      this.detallesRenta = data;
      this.productosRentados = this.detallesRenta.length
      this.calcularPorcentajeBicicletasRentadas();

    },
      (error) => {
        this.notificationService.notify('Error al obtener detalles de renta');
      }
    );
  }

  alquileres: Alquiler[] = []
  getAlquiler() {
    this.carritoService.getAlquiler().subscribe(
      (data: any) => {
        this.detallesRenta = data;
        this.alquileres = this.detallesRenta.alquileres
        console.log(this.detallesRenta)
        this.getGanancias()
        this.getProducts()
      },
      (error) => {
        this.notificationService.notify('Error al obtener detalles de renta');
      }
    );
  }

  ganancias = 0

  getGanancias() {
    for (let i = 0; i < this.alquileres.length; i++) {
      this.ganancias += this.alquileres[i].MontoTotal * 1.0
    }
  }

  getImageUrl(imageName: string): string {
    const token = localStorage.getItem('token');
    const tokenParam = token ? `?token=${token}` : '';
    return `${this.serverBaseUrl}/api/products/bikes/imagen/${imageName}${tokenParam}`;
  }

  generatePieChart() {
    const canvas: any = document.getElementById('pieChart');
    const ctx = canvas.getContext('2d');

    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Eléctrica', 'Tradicional', 'Montaña'],

        datasets: [{
          data: [this.porcentajeEléctricas, this.porcentajeTradicional, this.porcentajeMontaña],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      }
    });
  }

  procesarUsuariosPorFecha() {
    // Agrupar usuarios por fecha de creación
    const usuariosPorFecha = this.usuarios.reduce((result, usuario) => {
      const fechaCreacion = new Date(usuario.createdAt).toLocaleDateString();
      if (!result[fechaCreacion]) {
        result[fechaCreacion] = 0;
      }
      result[fechaCreacion]++;
      return result;
    }, {});

    // Convertir a un formato adecuado para el gráfico de línea
    this.usuariosCreadosPorFecha = Object.keys(usuariosPorFecha).map((fecha) => {
      console.log(fecha, usuariosPorFecha[fecha]);
      return { fecha, cantidad: usuariosPorFecha[fecha] };
    });

    // Ordenar por fecha
    this.usuariosCreadosPorFecha.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

    // Generar el gráfico de línea
    this.generateLineChart();
  }

  generateLineChart() {
    const canvas: any = document.getElementById('lineChart');
    const ctx = canvas.getContext('2d');

    const lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.usuariosCreadosPorFecha.map((info) => info.fecha),
        datasets: [{
          label: 'Usuarios Creados',
          data: this.usuariosCreadosPorFecha.map((info) => info.cantidad),
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        scales: {
          x: {
            // type: 'time', // Comentado para aceptar etiquetas de cadena en lugar de fechas
            time: {
              unit: 'day'
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
