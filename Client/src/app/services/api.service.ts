import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private addProductUrl = "http://localhost:5000/add-products"
  private viewProductsUrl = "http://localhost:5000/view-products"
  private viewProductUrl = "http://localhost:5000/view-product"
  private getProductsUrl = "http://localhost:5000/dashboard"
  private deleteProductUrl = "http://localhost:5000/delete"
  private addCartUrl = "http://localhost:5000/add-cartproduct"
  private getCartUrl = "http://localhost:5000/cartproducts"
  private deleteCartUrl = "http://localhost:5000/deletecart"
  private updateCartUrl = "http://localhost:5000/updateCart"


  constructor(private http: HttpClient) { }

  addProducts(product: any) {
    return this.http.post<any>(this.addProductUrl,product)
  }

  viewProducts() {
    return this.http.get<any>(this.viewProductsUrl);
  }

  getProducts() {
    return this.http.get<any>(this.getProductsUrl);
  }

  deleteProducts(id:any) {
    return this.http.delete<any>(`${this.deleteProductUrl}/${id}`);
  }

  addCartProduct(product: any) {
    return this.http.post<any>(this.addCartUrl,product)
  }

  viewProduct(id:any) {
    console.log(id)
    return this.http.get<any>(`${this.viewProductUrl}/${id}`)
  }

  getCartProducts() {
    return this.http.get<any>(this.getCartUrl)
  }

  updateCartProducts(product: any) {
    // console.log("ID ", id)
    return this.http.put<any>(`${this.updateCartUrl}/${product.productId}`, product)
  }

  deleteCartProducts(id:any) {
    return this.http.delete<any>(`${this.deleteCartUrl}/${id}`)
  }
}
