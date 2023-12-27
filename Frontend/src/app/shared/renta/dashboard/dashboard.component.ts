import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private _productService: ProductService){

  }
  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this._productService.getProduct().subscribe(data => {
      console.log(data)
    })
  }
}
