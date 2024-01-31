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

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css',
  imports: [NavComponent]
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
  usuarios: User[] = []
  public chart: Chart | any;
  constructor(
    private _productService: ProductService,
    private _userService: UserService,
    private notificationService: NotificationService,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    this._userService.getRolUsuario().subscribe((rol) => {
      this.isAdmin = rol === 2;
    });
    this.getProducts()
    this.getProductsRentados();
    this.getAlquiler();
    this.token = localStorage.getItem('token');

    this._userService.getUsers().subscribe((data) => {
      this.usuarios = data
      this.generateLineChart();
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

  generateLineChart() {
    const canvas: any = document.getElementById('lineChart');
    const ctx = canvas.getContext('2d');
    console.log(this.usuarios);

    const labels = this.usuarios.map(user => user.createAt ? new Date(user.createAt).toLocaleDateString() : '');
    const data = this.usuarios.map(() => 1); // 1 para contar la cantidad de registros por fecha

    const lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad de registros',
          data: data,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false,
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
          },
          y: {
            beginAtZero: true
          }
        }
      }

    });
  }

}