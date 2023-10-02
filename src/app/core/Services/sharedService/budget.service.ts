import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Budget, BudgetSousEntite, FraisMission } from '../Model/config.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  url = environment.apiUrl;

  constructor( private httpClient: HttpClient ) { }

  //Budget Entite
  addBudget(data:any){
    return this.httpClient.post(
      this.url+"/Budget/addBudget",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  updateBudget(data:any){
    return this.httpClient.post(
      this.url+"/Budget/updateBudget",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  
    }

    calculBudget(data:any){
      return this.httpClient.post(
        this.url+"/Budget/calcul",
        data,
        {
          headers: new HttpHeaders()
          .set('Content-Type',"application/json")
        })
    }

    ajoutGlobal(data:any){
      return this.httpClient.post(
        this.url+"/Budget/ajoutGlobal",
        data,
        {
          headers: new HttpHeaders()
          .set('Content-Type',"application/json")
        })
    }

    retaitGlobal(data:any){
      return this.httpClient.post(
        this.url+"/Budget/retraitGlobal",
        data,
        {
          headers: new HttpHeaders()
          .set('Content-Type',"application/json")
        })
    }

  activezBudget(data:any){
    return this.httpClient.post(
      this.url+"/Budget/activerBudget",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  getAllBudget():Observable<Budget[]>{
    return this.httpClient.get<Budget[]>(this.url+"/Budget/getAllBudget");
  }
  getBudgetEntiteById(data:any){
    return this.httpClient.get(this.url+"/Budget/getBudgetEntiteById", data)
  }
  getBudgetActive(idEntite:number){
    return this.httpClient.get(this.url+"/Budget/getBudgetStatut"+idEntite);
  }


  
  //Budget Sous-Entite
  addBudgetSousEntite(data:any){
    return this.httpClient.post(
      this.url+"/BudgetSousEntite/addBudget",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }
  updatetBudgetSousEntite(data:any){
    return this.httpClient.post(
      this.url+"/BudgetSousEntite/updateBudget",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  calculBudgetSousEntite(data:any){
    return this.httpClient.post(
      this.url+"/BudgetSousEntite/calcul",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  getAllBudgetSousEntite():Observable<BudgetSousEntite[]>{
    return this.httpClient.get<BudgetSousEntite[]>(this.url+"/BudgetSousEntite/getAllBudget");
  }
  getBudgetSousEntiteById(data:any){
    return this.httpClient.get(this.url+"/BudgetSousEntite/getBudgetBudgetSousEntiteById", data)
  }
  getSousEntiteBudgetActive(idSousEntite:any){
    return this.httpClient.get(this.url+"/Budget/getBudgetStatut"+idSousEntite);
  }
  activezBudgetSousEntite(data:any){
    return this.httpClient.post(
      this.url+"/BudgetSousEntite/activerBudget",
      data,
      {
        headers: new HttpHeaders()
        .set('Content-Type',"application/json")
      })
  }

  //Frais de Mission

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
  getFraisByLocalisation(data:any){
    return this.httpClient.get(this.url+"/FraisMission/getFraisByLocalisation",data);
  }
  getFraisByDure(data:any){
    return this.httpClient.get(this.url+"/FraisMission/getFraisByDure",data);
  }
  getFraisByLibelle(data:any){
    return this.httpClient.get(this.url+"/FraisMission/getFraisByLibelle",data);
  }
  getFraisByCategorie(data:any){
    return this.httpClient.get(this.url+"/FraisMission/getFraisByCategorie",data);
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
  getLieuByLieu(data:any){
    return this.httpClient.get(this.url+"/Lieu/getLieuByLieu",data);
  }
  getLieuByVille(data:any){
    return this.httpClient.get(this.url+"/Lieu/getLieuByVille",data);
  }
}
