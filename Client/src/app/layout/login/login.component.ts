import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userData: any = {};
  constructor(private _auth: AuthService, private _route: Router) {}

  ngOnInit(): void {}

  loginUser() {
    this._auth.loginUser(this.userData).subscribe(
      (res) => {
        if(res.msg == "No User Found") {
          window.alert(res.msg)
        }
        else {
          if(res.data.email == "rajramani185@gmail.com") {
            this._auth.isAdminFun()
          }
          this._auth.setId(res.data._id)
          this._auth.setToken(res.token)
          this._route.navigate(['/dashboard'])
        }
      },
      (err) => console.log(err)
    );
  }
}
