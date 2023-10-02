import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organisme } from '../Model/config.model';

@Injectable({
  providedIn: 'root'
})
export class OrganismeService {

  url = environment.apiUrl;

  constructor( private httpClient: HttpClient) { }

  //Organisme

  addOrganisme(data:any){
    return this.httpClient.post(
      this.url+"/Organisme/addOrganisme",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  updateOrganisme(data:any){
    return this.httpClient.post(
      this.url+"/Organisme/updateOrganisme",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  getAllOrganisme():Observable<Organisme[]>{
    return this.httpClient.get<Organisme[]>(this.url+"/Organisme/getAllOrganisme");
  }


}
