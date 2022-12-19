import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  products: any = [];
  counter: number = 0;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  onDelete(product:any) {
    this.apiService.deleteProducts(product._id).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.getProducts();
  }

  onEdit() {

  }

  getProducts() {
    this.apiService.viewProducts().subscribe(
      (res) => { 
        this.products = res
        console.log(this.products)
      },
      (err) => console.log(err)
    )
  }
}
