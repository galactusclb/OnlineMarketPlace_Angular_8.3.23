import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = "http://localhost:3000/api/"

  private _registerUrl = this.url+"register"
  private _loginUrl = this.url+"login"
  private _getPermisionUserUrl = this.url+"getPermisionUser"

  constructor(private http:HttpClient , private _router:Router ) { }

  registerUser( user ){
      return this.http.post<any>(this._registerUrl, user)
  }
  loginUser( user ){
    return this.http.post<any>(this._loginUrl, user)
  }

  logout(){
    localStorage.removeItem('token')
    this._router.navigate(['/login'])  
  }

  getPermisionUser(){
    return this.http.get<any>(this._getPermisionUserUrl)
  }
  

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  removeToken(){
    return localStorage.removeItem('token')
  }

}
