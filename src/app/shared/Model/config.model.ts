export interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

export interface genre {
  nom: string;
}


export interface Agents {
  idPersonnel:number;
  matricule:string;
  nomprenom:string;
  genre:string;
  statut:string;
  dateNaissance:string;
  unite:string;
  emploi:string;
  fonction:string;
  categorie:string;
  echelon:string;
  dateEntreServ:string;
  dateSortieServ:string;


}


export interface AppRoles {
    
  id:number;
  
  roleName:string;
}


export interface AppUsers {
    
  id:number;
  username:string;
  
   matricule:string;
   email:string;
  numeroTelephone:string;
  appRoles:AppRoles[];
}

export interface Budget {
    
  idBudget:number;
  budgetGlobaleAlloue:number;
  budgetGlobaleRestant:number;
  tauxRealisationGlobal:number;
  budgetalloue:number;
  budgetrealisation:number;
   budgetrestant:number;
  tauxrealisation:number;
  datePlan:string;
  statut:string;
  entite:Entite;
}

export interface BudgetSousEntite {
    idBudgetSousEntite:number;
    budgetAlloue:number;
    budgetRealisation:number;
    budgetRestant:number;
    tauxRealisation:number;
    datePlan:string;
    statut:string;
    sousEntite:SousEntite;
}

export interface Cout {
    idCout:number;
    designation:string;
    coutUnitaire:number;
    quantite:number;
    nbrParticipant:number;
    montant:number;
  
}


export interface Demande {
    idDemande:number;
    numeroDemande:number;
    ecole:string;
    dateDebut:string;
    dateFin:string;
    objet:string;
    statut:string;
    statutTraitement:string;
    motif:string;
    postulant:Postulant;

}


export interface Doc {
    idDoc:number;
    docName:string;
    docType:string;
    donne:any;
    demande: Demande;
  
}

export interface Entite {
    
  idEntite:number;
   codeinputation:string;
  nom:string;
    }


  export interface Formation{
    idFormation:number;
    numeroInscription:string;
     titre:string;
    objectif:string;
     dateCreation:string;
     datePlan:string;
     statut:string;
     avis:string;
    categorieFormation:string;
    total:number;
    type:string;
    dure:number;
    listDirection:Entite[];
    organisme:Organisme;
    pays:string;
    ville:string;
    zone:string;
    sessions:Session[];
    listAgents:Agents[];
    couts:Cout[];
    listDepartement:SousEntite[];
  
  }


  export interface FraisMission {
    idFraisMission:number;
     libelle:string;
      categorie:string;
     dure:number;
     prix:number;
    localisation:string;
    

}

export interface Organisme {
    
   idOrganisme:number;
    nom:string;
    contact:string;
    domaine:string;
    lieu:string;
}


export interface Plannifier {
    idPlannifier:number;
    evenement:string;
    dateDebut:string;
    color:string;
    dateFin:string;
    formation:Formation;
    salle:Salle;

}

export interface Postulant {
  idPostulant:number;
  nom:string;
   prenom:string;
  age:number;
  sexe:string;
  cnib:string;
   phone:string;
   mail:string;
  ville:string;
  statut:string;
  niveau:string;
  diplome:string;
}

export interface Salle {
    idSalle:number;
    nom:string;
    nbrPlace:number;
   description:string;
   motif:string;
   statut:string;

}

export interface Session {
     idSession:number;
    dateSessionDebut:string;
    dateSessionFin:string;
    dateDepart:string;
    dateRetour:string;
    formation:Formation;
}


export interface SousEntite {
    idSousEntite:number;
    codeinputation:string;
    nom:string;
    entite:Entite;
}

export interface Stage {
    idStage:number;
  dateDebut:string;
  dateFin:string;
  statut:string;
  postulant:Postulant;
  entite:Entite;

}