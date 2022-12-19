import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  Product:any;
  ID:string;

  constructor(private router: Router,private apiService: ApiService) { 
    this.ID = router.url.split('/')[2]
  }

  ngOnInit(): void {
    this.apiService.viewProduct(this.ID).subscribe(
      (res) => {
        this.Product = res;
        console.log(this.Product)
      }, 
      (err) => console.log(err)
    )
  }

}
