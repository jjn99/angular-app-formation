import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Demande, Doc, Postulant, Stage } from '../Model/config.model';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  
  url = environment.apiUrl;

  constructor( private httpClient: HttpClient) { }

   //Postulant
   addPostulant(data:any){
    return this.httpClient.post(
      this.url+"/Postulant/addPostulant",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  updatePostulant(data:any){
    return this.httpClient.post(
      this.url+"/Postulant/updatePostulant",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  
  getAllPostulant():Observable<Postulant[]>{
    return this.httpClient.get<Postulant[]>(this.url+"/Postulant/getAllPostulant");
  }

  getAllPostulantByStatut(statut:string){
    return this.httpClient.get(this.url+"/Postulant/geDemandeByStatus/"+statut);
  }



   //Demande

   addDemande(data:any){
    return this.httpClient.post(
      this.url+"/Demande/addDemande",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  updateDemande(data:any){
    return this.httpClient.post(
      this.url+"/Demande/updateDemande",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

   sendSimpleMessage(data:any){
    return this.httpClient.post(
      this.url+"/Demande/sendSimpleMessage",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  
  getAllDemande():Observable<Demande[]>{
    return this.httpClient.get<Demande[]>(this.url+"/Demande/getAllDemande");
  }

  geDemandeByStatus(statut:string){
    return this.httpClient.get(this.url+"/Demande/geDemandeByStatus/"+statut);
  }

  getDemandeByIdPostulant(idPostulant:number){
    return this.httpClient.get(this.url+"/Demande/getDemandeByIdPostulant/"+idPostulant);
  }

  
  
  addDoc(numeroDemande:string, file:File){
    return this.httpClient.post(
      this.url+"/Doc/addDoc/"+numeroDemande,
      file,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  
  getAllDoc():Observable<Doc[]>{
    return this.httpClient.get<Doc[]>(this.url+"/Doc/getAllDoc");
  }

  TelechargerFile(idDoc:number){
    return this.httpClient.get(this.url+"/Doc/TelechargerFile/"+idDoc);
  }

  getFileByIdDemande(idDemande:number){
    return this.httpClient.get(this.url+"/Doc/getFileByIdDemande/"+idDemande);
  }


   //Stage

   addStage(data:any){
    return this.httpClient.post(
      this.url+"/Stage/addStage",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  updateStage(data:any){
    return this.httpClient.post(
      this.url+"/Stage/updateStage",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  
  getAllStage():Observable<Stage[]>{
    return this.httpClient.get<Stage[]>(this.url+"/Stage/getAllStage");
  }

   getStageByStatus(statut:string){
    return this.httpClient.get(this.url+"/Stage/geDemandeByStatus/"+statut);
  }

   getStageByIdEntite(idEntite:number){
    return this.httpClient.get(this.url+"/Stage/getStageByIdEntite/"+idEntite);
  }

  getStageByIdPostulant(idPostulant:number){
    return this.httpClient.get(this.url+"/Stage/getStageByIdPostulant/"+idPostulant);
  }



  
}
