import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  details:any = {}

  townList:any = ['colombo','gampaha','kaduwela'];
  
  action:boolean = false;

  constructor(private _auth:AuthService,private _router:Router) { }

  ngOnInit() {
      this.getbasicuserdetailsbyuid()
      this.getPermision();
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
  
  getbasicuserdetailsbyuid(){
    this._auth.getbasicuserdetailsbyuid()
      .subscribe(
        res=>{
          this.details = res[0]
        },
        err=>console.error(err)
      )
  }
  updateChanges(){
    this.action = true;
    this._auth.updateprofile(this.details)
      .subscribe(
        res=>{
          alert('Changes saved succesfully')
          this.action = false;
        },
        err=>{
          console.error(err.error.errors[0].msg),
          alert(err.error.errors[0].msg)
          this.action = false
        }
      )
  }
}
