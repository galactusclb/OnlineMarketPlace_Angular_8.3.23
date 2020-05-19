import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../shopping/shopping.component.css']
})
export class LoginComponent implements OnInit {

  loginUserDetails = {}

  constructor(private _auth:AuthService,private _router:Router) { }

  ngOnInit() {
  }
  loginUser(){
    //console.log(this.regUserDetails)
    this._auth.loginUser(this.loginUserDetails)
        .subscribe(
          success => {
            if (success) {
              this._auth.getLoginStatus(true);
              this._router.navigate(['/register']);
            }
          }
        )
}
}
