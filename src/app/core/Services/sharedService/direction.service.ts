import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Entite, SousEntite } from '../Model/config.model';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {

  
  url = environment.apiUrl;

  constructor( private httpClient: HttpClient) { }

  addNewEntite(data:any){
    return this.httpClient.post(
      this.url+"/Entite/addEntite",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  updateEntite(data:any){
    return this.httpClient.post(
      this.url+"/Entite/updateEntite",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  ActivezBudgetEntite(data:any){
    return this.httpClient.post(
      this.url+"/Entite/ActivezBudget",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  getAllEntite():Observable<Entite[]>{
    return this.httpClient.get<Entite[]>(this.url+"/Entite/getAllEntite");
  }

  deleteEntite(idEntite:any){
    return this.httpClient.delete(
      this.url+"/Entite/deleteEntite/"+idEntite,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }


  addNewSousEntite(data:any){
    return this.httpClient.post(
      this.url+"/sousEntite/addSousEntite",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  updateSousEntite(data:any){
    return this.httpClient.post(
      this.url+"/sousEntite/updateSousEntite",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  getAllSousEntite():Observable<SousEntite[]>{
    return this.httpClient.get<SousEntite[]>(this.url+"/sousEntite/getAllSousEntite");
  }

  ActivezBudgetSousEntite(data:any){
    return this.httpClient.post(
      this.url+"/sousEntite/ActivezBudget",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  deleteSousEntite(idSousEntite:any){
    return this.httpClient.delete(
      this.url+"/sousEntite/deleteSousEntite/"+idSousEntite,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

}
