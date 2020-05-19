import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private _auth:AuthService, private _router: Router){}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean > | Promise<boolean > | boolean{

      const user = this._auth.decode();

      //console.log('roles : '+next.data.role)
        
      for (let i = 0; i < next.data.role.length; i++) {
        if (user.subject[0].role === next.data.role[i]) {
          console.log(next.data.role[i])
          return true;
        }
      }

      console.error('Access denied. Must have permission to view content')
      this._router.navigate(['/404']);
      return false;
  }
  // canLoad(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
}
