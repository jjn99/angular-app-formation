import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent {


  constructor( private router:Router){}

  token:any = localStorage.getItem('token');
  tokenPayLoad:any;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  redirect(){
    if(this.token == null){
      this.router.navigate(['/']);
    }
    else{this.router.navigate(['/dashboard']);}
  }


}
