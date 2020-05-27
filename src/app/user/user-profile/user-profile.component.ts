import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SidebarService } from './sidebar/sidebar.service';
import { Router } from '@angular/router';

// import { PerfectScrollbarConfigInterface,
//   PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss','../../shopping/shopping.component.css']
  
})
export class UserProfileComponent implements OnInit {

  constructor(private _auth:AuthService,public sidebarservice: SidebarService,private _router:Router) {   }

  ngOnInit() {
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

  toggleSidebar() {
    console.log(this.sidebarservice.getSidebarState())
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }
  

}
