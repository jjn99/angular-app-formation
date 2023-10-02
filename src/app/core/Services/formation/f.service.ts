import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FraisMission } from '../Model/config.model';

@Injectable({
  providedIn: 'root'
})
export class FService {

  url = environment.apiUrl;

  constructor( private httpClient: HttpClient) { }

   //Frais
   addFrais(data:any){
    return this.httpClient.post(
      this.url+"/FraisMission/addFrais",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  updateFrais(data:any){
    return this.httpClient.post(
      this.url+"/FraisMission/updateFrais",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  
  getAllFrais():Observable<FraisMission[]>{
    return this.httpClient.get<FraisMission[]>(this.url+"/FraisMission/getAllFrais");
  }

  //Lieu
  addLieu(data:any){
    return this.httpClient.post(
      this.url+"/Lieu/addLieu",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  updateLieu(data:any){
    return this.httpClient.post(
      this.url+"/Lieu/updateLieu",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  getAllLieu(){
    return this.httpClient.get(this.url+"/Lieu/getAllLieu");
  }


}
