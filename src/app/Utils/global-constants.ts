export class GlobalConstants{

    //Erreur generic
    public static genericErrorLogin: string = "Username ou mot de passe incorrect!";
    public static genericError: string = "Une erreur c'est produite. Veuillez réessayer plustard! ";
    public static connexionValidator: string = "Connexion reussi! ";
    public static NoAutorisation: string ="VOus n'avez pas l'autorisation d'accéder a cette ressource !";
    public static errorSupp: string = "L'operation de suppression a échoué!";
    //Regex
    public static username: string = "[a-zA-Z0-9 ]*";
    public static numeroTelephone: string = "^[e0-9]{10,10}$";
    public static email: string ="[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

    //Variable
    public static error: string = "error";
}