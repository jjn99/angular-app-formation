import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Formation } from '../Model/config.model';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  url = environment.apiUrl;

  constructor( private httpClient: HttpClient) { }

  //Formation
  addFormation(data:any){
    return this.httpClient.post(
      this.url+"/Formation/addFormation",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  updateFormation(data:any){
    return this.httpClient.post(
      this.url+"/Formation/updateFormation",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  getAllFormation():Observable<Formation[]>{
    return this.httpClient.get<Formation[]>(this.url+"/Formation/getAllFormation");
  }

  addAgentToFormation(data:any){
    return this.httpClient.post(
      this.url+"/Formation/addAgentToFormation",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  removeAgentToFormation(data:any){
    return this.httpClient.post(
      this.url+"/Formation/removeAgentToFormation",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  addEntiteToFormation(data:any){
    return this.httpClient.post(
      this.url+"/Formation/addEntiteToFormation",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  removeEntiteToFormation(data:any){
    return this.httpClient.post(
      this.url+"/Formation/removeEntiteToFormation",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  addSousEntiteToFormation(data:any){
    return this.httpClient.post(
      this.url+"/Formation/addSousEntiteToFormation",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  removeSousEntiteToFormation(data:any){
    return this.httpClient.post(
      this.url+"/Formation/removeSousEntiteToFormation",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  getFormationByIdEntite(idEntite:number){
    
    return this.httpClient.get(this.url+"/Formation/getFormationByIdEntite/"+idEntite);

  }
  getFormationByIdSousEntite(idSousEntite:number){
    
    return this.httpClient.get(this.url+"/Formation/getFormationByIdSousEntite/"+idSousEntite);

  }
  getAgentDisponisble(dateDebut:Date){
    
    return this.httpClient.get(this.url+"/Formation/getAgentDisponisble/"+dateDebut);

  }
  getFormationByCategorieFormation(categorieFormation:string){
    
    return this.httpClient.get(this.url+"/Formation/getFormationByCategorieFormation/"+categorieFormation);

  }
  getByStatut(statut:string){
    
    return this.httpClient.get(this.url+"/Formation/getByStatut/"+statut);

  }
  getByType(type:string){
    
    return this.httpClient.get(this.url+"/Formation/getByType/"+type);

  }
  getFormationByAvis(avis:string){
    
    return this.httpClient.get(this.url+"/Formation/getFormationByAvis/"+avis);

  }

  getFormationByAgent(idPersonnel:number){
    
    return this.httpClient.get(this.url+"/Formation/getFormationByAgent/"+idPersonnel);

  }
  
}
