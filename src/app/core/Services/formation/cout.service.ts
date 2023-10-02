import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cout } from '../Model/config.model';

@Injectable({
  providedIn: 'root'
})
export class CoutService {

  
  url = environment.apiUrl;

  constructor( private httpClient: HttpClient) { }

  //Cout
  addCout(data:any){
    return this.httpClient.post(
      this.url+"/Cout/addCout",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  updateCout(data:any){
    return this.httpClient.post(
      this.url+"/Cout/updateCout",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  getAllCout():Observable<Cout[]>{
    return this.httpClient.get<Cout[]>(this.url+"/Cout/getAllCout");
  }

  getEntiteByFormationId(idFormation:number){
    return this.httpClient.get(this.url+"/Cout/getEntiteByFormationId/"+idFormation);
  }

}
