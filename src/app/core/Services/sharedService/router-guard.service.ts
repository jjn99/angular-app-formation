import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SnackBarService } from './snack-bar.service';
import jwt_decode from 'jwt-decode';
import { GlobalConstants } from './global-constants';

@Injectable({
  providedIn: 'root'
})
export class RouterGuardService {

  constructor(
    private authService:AuthService,
    private router:Router,
    private snackbarService:SnackBarService
  ) { }

    canActivate(route:ActivatedRouteSnapshot): boolean{
      let expectedRoleArray:any = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;
    console.log(expectedRoleArray);
    const token:any = localStorage.getItem('token');

    var tokenPayLoad:any;
    try{
      tokenPayLoad = jwt_decode(token);
      console.log(tokenPayLoad);
    }catch(err){
      localStorage.clear();
      this.router.navigate(['/']);
    }
    let expectedRoles:any[]=[];

    for(let i = 0; i < expectedRoleArray.length; i++){
      for(let j =0 ; j<tokenPayLoad.roles.length; j++){
        if(expectedRoleArray[i] == tokenPayLoad.roles[j]){
          expectedRoles.push(tokenPayLoad.roles[j]);
          console.log(expectedRoles);
      }
    }
  }

    if(tokenPayLoad.roles.include("Admin") || tokenPayLoad.roles.include("Manager") 
    || tokenPayLoad.roles.include("Stage")|| tokenPayLoad.roles.include("Formation") 
    || tokenPayLoad.roles.include("Salle")){
      if(this.authService.isAuthenticated() && tokenPayLoad.roles == expectedRoles){
        return true;
      }
      this.snackbarService.openSnackBar(GlobalConstants.NoAutorisation,GlobalConstants.error);
      this.router.navigate(['/home']);
      return false;
    }
    else{
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }

 }

}
