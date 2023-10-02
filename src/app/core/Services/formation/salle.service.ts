import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Salle } from '../Model/config.model';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  
  url = environment.apiUrl;

  constructor( private httpClient: HttpClient) { }

  //Salle

  addSalle(data:any){
    return this.httpClient.post(
      this.url+"/Salle/addSalle",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  updateSalle(data:any){
    return this.httpClient.post(
      this.url+"/Salle/updateSalle",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  getAllSalle():Observable<Salle[]>{
    return this.httpClient.get<Salle[]>(this.url+"/Salle/getAllSalle");
  }


  
}
