import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  details:any = {}
  
  action:boolean = false;

  constructor(private _auth:AuthService , private _router:Router) { }

  ngOnInit() {
    this.getPermision()
  }

  getPermision(){
    this._auth.getPermisionUser()
      .subscribe(
        res=>{},
        err=> {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._auth.removeToken()
              this._auth.getLoginStatus(true);
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }
  
  updateChanges(){
    this.action = true;
    this._auth.updatepassword(this.details)
      .subscribe(
        res=>{
          alert('Changes saved succesfully')
          this.action = false
        },
        err=>{
          console.log(err.error)
          alert(err.error.errors[0].msg)
          this.action = false
        }
      )
  }

}
