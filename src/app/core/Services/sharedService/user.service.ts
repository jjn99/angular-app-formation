import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { AppRoles, AppUsers } from '../Model/config.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl;

  constructor( private httpClient: HttpClient) { }

  login(data:any){
    return this.httpClient.post(
      this.url+"/Utilisateur/login",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }


  //Roles
  addRole(data:any){
    return this.httpClient.post(
      this.url+"/Roles/addRole",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  getAllRoles():Observable<AppRoles[]>{
    return this.httpClient.get<AppRoles[]>(this.url+"/Roles/listRoles");
  }

  findUserByUserName(data:any){
     return this.httpClient.get(this.url+"/Utilisateurs/findUserByUserName");
  }

  //User


  changePassword(data:any){
    return this.httpClient.post(
      this.url+"/Utilisateur/changePassword",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  forgotPassword(data:any){
    return this.httpClient.post(
      this.url+"/Utilisateur/forgotPassword",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  addNewUser(data:any){
    return this.httpClient.post(
      this.url+"/Utilisateur/addNewUser",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  updateUser(data:any){
    return this.httpClient.post(
      this.url+"/Utilisateur/updateUser",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  addRolesToUsers(data:any){
    return this.httpClient.post(
      this.url+"Utilisateur/addRolesToUsers",data,{
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      }
    )
  }
  removeRolesToUsers(data:any){
    return this.httpClient.post(
      this.url+"Utilisateur/removeRolesToUsers",data,{
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      }
    )
  }

  getAllUser():Observable<AppUsers[]>{
    return this.httpClient.get<AppUsers[]>(this.url+"/Utilisateur/getAllUsers")
  }

  getUserByUsername(username:string){
    return this.httpClient.get(this.url +"/Utilisateur/getUserByUserName/"+username)
  }

  checkToken():Observable<any>{
    return this.httpClient.get(this.url+"/Utilisateur/checkToken");
  }


}
