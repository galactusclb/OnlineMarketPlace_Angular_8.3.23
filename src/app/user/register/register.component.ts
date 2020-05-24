import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../../shopping/shopping.component.css']
})
export class RegisterComponent implements OnInit {

  regUserDetails = {}

  townList:any = ['colombo','gampaha','kaduwela'];

  constructor(private _auth:AuthService, private _router:Router) { }

  ngOnInit() {
    this.regUserDetails['town'] = this.townList[0];
  }

  registerUser(){
      //console.log(this.regUserDetails)
      this._auth.registerUser(this.regUserDetails)
          .subscribe(
            res=>{
              console.log(res);
              this.regUserDetails = {}
              this._router.navigate(['/login'])
            },
            err=>{
              console.log(err);
              //console.log(err.error.errors)
            }
          )
  }

}
