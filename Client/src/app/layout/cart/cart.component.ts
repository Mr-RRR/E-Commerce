import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: any = []
  totalPrice: Number = 0

  constructor(private cartServices: CartService,private apiServices: ApiService) { }

  ngOnInit(): void {
    // this.cartServices.getCartData().subscribe(
    //   (res) => {
    //     this.cartProducts = res
    //   },
    //   (err) => console.log(err)
    // )
    this.cartServices.getCartProducts()
    this.cartServices.getCartData().subscribe(
      (res) => this.cartProducts.push(...res),
      (err) => console.log(err)
    )
    this.totalPrice = this.cartServices.getToatal()
    console.log("Total ", this.totalPrice)
    // console.log("CaRtProducts ", this.cartProducts)
  }

  // getProducts() {
  //   this.apiServices.getCartProducts().subscribe(
  //     (res) => {
  //       this.cartProducts = res;
  //       // this.cartServices.setCartData(res)
  //       console.log(this.cartProducts)
  //     },
  //     (err) => console.log(err)
  //   )    
  // }
  deleteCart(product:any) {
    this.cartServices.removeCart(product)
    this.cartServices.getCartData().subscribe(
      (res) => this.cartProducts = res
    )
    // console.log(this.cartProducts)
    // this.apiServices.deleteCartProducts(product._id).subscribe(
    //   (res) => {
    //     console.log(res)
    //   },
    //   (err) => console.log(err)
    // )
    // this.getProducts();
  }

  buyProducts(product:any) {
    console.log(product.title);
  }


}
