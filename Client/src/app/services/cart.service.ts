import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public dcartProducts:any = []
  public cartProducts:any = []
  public totalPrice:Number = 0
  public productList = new BehaviorSubject<any>(this.cartProducts);
  public _productList = this.productList.asObservable()

  constructor(private apiService: ApiService) { }


  getCartData() {
    console.log("CartProducts ", this.cartProducts)
    return this._productList
  }

  getCartProducts() {
    this.apiService.getCartProducts().subscribe(
      (res) =>{ res.forEach((r:any) => {
        this.cartProducts.push(r)
      })
      this.productList.next(res) }
      ,
      (err) => console.log(err)
    )
    }

  addToCart(product:any) {
    let already = this.cartProducts.find((c:any) => {
      let id = c._id;
      if(c.productId) id = c.productId;
      return id === product._id
    })
    if(already) {
      console.log("already ",already.productId)
      this.apiService.updateCartProducts(already).subscribe(
        (res) => this.cartProducts = res,
        (err) => console.log(err)
      )
    } else {
      this.apiService.addCartProduct(product).subscribe(
      (res) => {
        this.cartProducts.push(res)
        this.productList.next(this.cartProducts);
      },
      (err) => console.log(err)
    )
    }
    // console.log("productList ",this.productList)
    // console.log("cartProducts ",this.cartProducts)
    // this.getToatal();
  }

  getToatal() {
    let total = 0
    console.log("cart ", this.cartProducts.toString())
    // console.log("TOTAL ", total)
    return total;
  }

  getToatalPrice() {
    return this.totalPrice
  }

  removeCart(product:any) {
    this.apiService.deleteCartProducts(product._id).subscribe(
      (res) => {
        // console.log("Res ", res)
        this.cartProducts = res
        this.productList.next(res)
      },
      (err) => console.log(err)
    )
    // this.cartProducts.map((m:any,index:any) => {
    //   if(m._id == product._id) {
    //     this.cartProducts.splice(index,1)
    //   }
    // })

  }

}
