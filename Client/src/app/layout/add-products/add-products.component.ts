import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  productData: any = {};
  imageFile: any;

  constructor(private apiServices: ApiService) { }

  ngOnInit(): void {
  
  }

  onFileSelected(event:any) {
    this.imageFile = event.target.files[0];
    console.log(event);
  }

  // handleChange(event:any) {
  //   console.log(event.target.value)
  //   let value = event.target.value
  //   // console.log(typeof value)
  //   // if(value == "-")
  // }

  checkProducts() {
    if(this.productData.quantity <= 0) {
      window.alert("Quantity should be greater than 0")
    } else if(this.productData.price <= 0) {
      window.alert("Price should be grater than 0")
    } else {
      const formData = new FormData();
      formData.append('title', this.productData.title)
      formData.append('productImage', this.imageFile)
      formData.append('quantity', this.productData.quantity)
      formData.append('price', this.productData.price)
      formData.append('description', this.productData.description)
      // this.productData.productImage = this.imageFile;
      this.apiServices.addProducts(formData).subscribe(
        (res) => window.alert("Added Successfully"),
        (err) => console.log(err)
      )
    }
  }
}
