import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, mapTo, tap } from "rxjs/operators";
import { Observable, of, BehaviorSubject, throwError } from "rxjs";
import { Tokens } from "../Models/Token";
import { User } from "../Models/user";
import decode from "jwt-decode";
import * as moment from "moment";

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

  private token: string;
  private tokenTimer: any;
  private userId: string;
  private userName: string;
  private role: string;
  private isAuthenticated = false;

  private newLogin = new BehaviorSubject(false);
  newLoginStatus = this.newLogin.asObservable();

  constructor(private http: HttpClient, private _router: Router) {}

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }
  confirmAccount(details) {
    return this.http.post<any>(this._confirmEmailUrl, { details: details });
  }
  loginUser(user): Observable<any> {
    return this.http.post<any>(this._loginUrl, user).pipe(
      tap((res) => {
        const token = res.jwtToken;
        this.token = token;

        if (token) {
          const expiresInDuration = res.expiresIn;
          this.setAuthTimer(expiresInDuration);

          this.userId = res._uid;
          this.userName = res.userName;
          this.role = res.role;

          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );

          console.log(expirationDate);

          this.saveAuthData(
            token,
            expirationDate,
            this.userId,
            this.userName,
            this.role
          );
          // this._router.navigate(['/dashboard'])
        }
      }),
      mapTo(true),
      catchError(this.errorHandler)
    );
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: String,
    userName: string,
    role: string
  ) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem(
      "userAuth",
      JSON.stringify({ userId: userId, userName: userName, role: role })
    );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error || "Something went wrong.Please try again later.");
  }

  getLoginStatus(newLoginInstance: boolean) {
    //3
    this.newLogin.next(newLoginInstance);
  }

  checkAuthorization(): boolean {
    //4
    const user = this.getUserAuth();

    if (this.loggedIn()) {
      if (this.getUserAuth()) {
        if (user.role === "admin") {
          // console.log("admin " + true);
          return true;
        }
      }
    }
    return false;
  }

  getUserAuth() {
    return JSON.parse(localStorage.getItem("userAuth"));
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
    this.token = null;
    this.isAuthenticated = false;
    this.clearAuthData();
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.getLoginStatus(true); //5
    this._router.navigate(["/login"]);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userAuth");
  }

  getPermisionUser() {
    return this.http.get<any>(this._getPermisionUserUrl);
  }

  getPermision() {
    return !!this.getPermisionUser();
  }

  loggedIn() {
    if (!!localStorage.getItem("token")) {
      var now = moment(new Date());
      var end = moment(localStorage.getItem("expiration"));
      var duration = moment.duration(end.diff(now, "seconds"));
      this.setAuthTimer(duration["_milliseconds"]);
    }
    return !!localStorage.getItem("token");
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
}
