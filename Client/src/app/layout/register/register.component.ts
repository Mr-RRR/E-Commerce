import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userData: any = {};
  constructor(private _auth: AuthService, private _route: Router) {}

  ngOnInit(): void {}


  checkUser() {
    if(this.userData.password != this.userData.confirm_password) {
      window.alert("Password doesn't match")
    } else if(this.userData.password.length < 8) {
      window.alert("Password length should be greater than 7")
    } else{ 
      this.registerUser()
    }
  }

  registerUser() {
    this._auth.registerUser(this.userData).subscribe(
      (res) => {
        if(res.msg == "User Alreay exists") {
            window.alert("User Alreay exist Please try another email")
        } else {
          this._auth.setId(res.user._id)
          localStorage.setItem('token', res.token)
          this._route.navigate(['/dashboard'])
        }
      },
      (err) => console.log(err)
    );
  }
}
