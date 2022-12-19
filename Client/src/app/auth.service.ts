import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAdmin:boolean = false;
  private registerUrl = 'http://localhost:5000/register';
  private loginUrl = 'http://localhost:5000/login';
  constructor(private http: HttpClient) {}
  private userId:any

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  registerUser(user: any) {
    return this.http.post<any>(this.registerUrl, user);
  }

  isAdminFun() {
    this.isAdmin = true;
  }

  getAdmin() {
    return this.isAdmin;
  }

  loginUser(user: any) {
    return this.http.post<any>(this.loginUrl, user);
  }

  setId(id:any) {
    localStorage.setItem("userId", id)
  }

  getId() {
    return localStorage.getItem("userId")
  }
  removeUserId() {
    localStorage.removeItem('userId')
  }
  setToken(token:any) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  removeToken(){
    localStorage.removeItem('token')
  }
}
