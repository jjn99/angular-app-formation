import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Agents } from '../Model/config.model';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  url = environment.apiUrl;

  constructor( private httpClient: HttpClient) { }

  addNewAgent(data:any){
    return this.httpClient.post(
      this.url+"/Personnel/addPersonnel",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  deleteAgent(idPersonnel:any){
    return this.httpClient.delete(
      this.url+"/Personnel/deletePersonnel"+idPersonnel,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  updateAgent(data:any){
    return this.httpClient.post(
      this.url+"/Personnel/updatePersonnel",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  getAllPersonnel():Observable<Agents[]>{
    return this.httpClient.get<Agents[]>(this.url+"/Personnel/getAllPersonnel");
  }
/* 
  getPersonnelByMatricule(data:any){
    return this.httpClient.get(this.url+"/Personnel/getPersonnelByMatricule",data);
  }

  getPersonnelByNomPrenom(data:any){
    return this.httpClient.get(this.url+"/Personnel/getPersonnelByNomPrenom");
  }

  getPersonnelByUnite(data:any){
    return this.httpClient.get(this.url+"/Personnel/getPersonnelByUnite");
  }

  getPersonnelByEmploi(data:any){
    return this.httpClient.get(this.url+"/Personnel/getPersonnelByEmploi");
  }
  
  getPersonnelByFonction(data:any){
    return this.httpClient.get(this.url+"/Personnel/getPersonnelByFonction");
  }

  getPersonnelByCategorie(data:any){
    return this.httpClient.get(this.url+"/Personnel/getPersonnelByCategorie");
  }

  getPersonnelByEchelon(data:any){
    return this.httpClient.get(this.url+"/Personnel/getPersonnelByEchelon");
  }
*/
}
 