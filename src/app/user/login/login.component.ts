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
          res=>{
            console.log(res);
            localStorage.setItem('token', res.token)
            this._router.navigate(['/register'])
          },
          err=>console.log(err)
        )
}
}
