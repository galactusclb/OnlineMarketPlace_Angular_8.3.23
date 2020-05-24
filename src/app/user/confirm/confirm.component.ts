import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css','../../shopping/shopping.component.css']
})
export class ConfirmComponent implements OnInit {

  confirm:any ;

  constructor(private Activatedroute:ActivatedRoute,private _auth:AuthService) { }

  ngOnInit() {
    this.Activatedroute.paramMap.subscribe(params => {      
      this._auth.confirmAccount(params.get("token"))
        .subscribe(
          res=>{
            console.log(res),
            this.confirm = 'success'
          },
          err=>{
            console.log(err),
            this.confirm = 'error'
          }
        )
    });
  }

}
