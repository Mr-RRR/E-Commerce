import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products:any = [];
  cartProducts:any = []
  userId:any;

  constructor(private apiServices: ApiService, private cartServices:CartService,private _auth:AuthService) { }

  ngOnChange():void {
    // this.getProducts();
  }

  ngOnInit(): void {
    this.apiServices.getProducts().subscribe(
      (res) =>  { 
        this.products = res
        // console.log(this.products)
       },
       (err) => {
         if(err.status === 401) {
          this._auth.removeToken()
          this._auth.removeUserId()
         }
       } 
    )
    this.cartServices.getCartProducts()
    
    // this.apiServices.getCartProducts().subscribe(
    //   (res) => {
    //     this.cartServices.setCartData(res)
    //   },
    //   (err) => {
    //     console.log(err)
    //   }
    // )
    this.userId = this._auth.getId()
    console.log("userId ",this.userId)
  }

  handleClick(product:any) {
    this.apiServices.viewProduct(product)
  }

  addToCart(product:any) {
    product = {...product, userId: this.userId}
    this.cartServices.addToCart(product)
    // this.apiServices.addCartProduct(product).subscribe(
    //   (res) => {
    //     this.cartProducts.push(res)
    //     // this.cartServices.addToCart(this.cartProducts)
    //   },
    //   (err) => console.log(err)
    // )
  }

  

}
