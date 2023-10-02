import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Plannifier } from '../Model/config.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  
  url = environment.apiUrl;

  constructor( private httpClient: HttpClient) { }

  //Salle

  addPlannifier(data:any){
    return this.httpClient.post(
      this.url+"/Plannifier/addPlannifier",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  updatePlannifier(data:any){
    return this.httpClient.post(
      this.url+"/Plannifier/updatePlannifier",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  getAllPlannifier():Observable<Plannifier[]>{
    return this.httpClient.get<Plannifier[]>(this.url+"/Plannifier/getAllPlannifier");
  }


  
  
}
