import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css','../../shopping/shopping.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private _auth:AuthService) { }

  ngOnInit() {
  }

  getPermision(){
    this._auth.getPermisionUser()
      .subscribe(
        res=>{},
        err=> {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._auth.removeToken()
            }
          }
        }
      )
  }

}
