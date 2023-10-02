import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Session } from '../Model/config.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  url = environment.apiUrl;

  constructor( private httpClient: HttpClient) { }

  //Session

  addSession(data:any){
    return this.httpClient.post(
      this.url+"/Session/addSession",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  updateSession(data:any){
    return this.httpClient.post(
      this.url+"/Session/updateSession",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  getSessionByIdFormation(idFormation:number):Observable<Session[]>{
    return this.httpClient.get<Session[]>(this.url+"/Session/getSessionByIdFormation/"+idFormation);
  }

  
}
