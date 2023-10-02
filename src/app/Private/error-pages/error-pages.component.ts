import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-pages',
  templateUrl: './error-pages.component.html',
  styleUrls: ['./error-pages.component.scss']
})
export class ErrorPagesComponent implements OnInit{

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
