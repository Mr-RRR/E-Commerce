import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  totalCartNumber:number = 0;
  isAdmin:boolean = false;

  constructor(private cartServices: CartService,private apiServices: ApiService,private _auth:AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this._auth.getAdmin()
    // this.apiServices.getCartProducts().subscribe(
    //   (res) => {
    //     this.totalCartNumber = res.length
    //   },
    //   (err) => console.log(err)
    // )
    this.cartServices.getCartData().subscribe((res) => this.totalCartNumber = res.length)
  }

  

  logoSrc = '../assets/images/download.png';
  cartImage = '../assets/images/cart.svg';
}
