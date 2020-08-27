import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, mapTo, tap } from "rxjs/operators";
import { Observable, of, BehaviorSubject } from "rxjs";
import { Tokens } from "../Models/Token";
import { User } from "../Models/user";
import decode from "jwt-decode";

import { environment } from "../../environments/environment";

const BACKEND_URL = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = BACKEND_URL;

  private _registerUrl = this.url + "register";
  private _loginUrl = this.url + "login";
  private _getPermisionUserUrl = this.url + "getPermisionUser";
  private _confirmEmailUrl = this.url + "confirmemail";
  private _getbasicuserdetailsbyuidUrl = this.url + "getbasicuserdetailsbyuid";
  private _updateprofileUrl = this.url + "updateprofile";
  private _updatepassword = this.url + "updatepassword";

  user$: Observable<User>;

  private loggedUser: string;

  private newLogin = new BehaviorSubject(false);
  newLoginStatus = this.newLogin.asObservable();

  constructor(private http: HttpClient, private _router: Router) {}

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }
  confirmAccount(details) {
    return this.http.post<any>(this._confirmEmailUrl, { details: details });
  }
  loginUser(user): Observable<boolean> {
    return this.http.post<any>(this._loginUrl, user).pipe(
      tap((token) => this.doLoginUser(user.uName, token)),
      mapTo(true),
      catchError((error) => {
        alert(error.error);
        return of(false);
      })
    );
  }

  getbasicuserdetailsbyuid() {
    return this.http.get<any>(this._getbasicuserdetailsbyuidUrl);
  }
  updateprofile(details) {
    return this.http.post<any>(this._updateprofileUrl, details);
  }
  updatepassword(details) {
    return this.http.post<any>(this._updatepassword, details);
  }

  logout() {
    localStorage.removeItem("token");
    this.getLoginStatus(true);
    this._router.navigate(["/login"]);

    // const data : User = {
    //   uid: user.uid,
    //   email: user.email,
    //   roles: {
    //     customer: true,
    //     admin:false
    //   }
    // }
  }

  getPermisionUser() {
    return this.http.get<any>(this._getPermisionUserUrl);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeToken(tokens);
  }

  storeToken(token: Tokens) {
    localStorage.setItem("token", token.jwtToken);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  removeToken() {
    return localStorage.removeItem("token");
  }

  decode() {
    //const gg = decode(localStorage.getItem('token'))
    //console.log(gg.subject[0].userName)
    return decode(localStorage.getItem("token"));
  }
  checkAuthorization(): boolean {
    if (this.loggedIn()) {
      const user = this.decode();

      if (user !== undefined || user === null) {
        if (user.subject[0].role === "admin") {
          console.log("admin accessed");
          return true;
        }
      }
    }

    console.log("admin denied");
    return false;
  }

  getLoginStatus(newLoginInstance: boolean) {
    this.newLogin.next(newLoginInstance);
  }
}
