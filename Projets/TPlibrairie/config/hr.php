<?php

// Bonjour à toi ! Entrainons nous à la POO dans le monde enchanté des Ressources Humaines.
// Typiquement les thématiques qu'on aime dans les sujets d'examens !

// Ta mission est simple : remplir les différents parties de ces différentes classes 
// (ou il est écrit TO DO en gros)
// 
// SCROLL EN BAS POUR MIEUX COMPRENDRE L'OBJECTIF DE CES METHODES ET LES RESULTATS ATTENDUS

// Tu n'en sauras pas plus ! Bon courage

// Interface imposant une méthode de travail pour les collaborateurs
interface IPersonnel {
    public function travailler(): string;
}

// Classe abstraite définissant un collaborateur
abstract class Collaborateur implements IPersonnel {
    protected string $nom;
    protected string $poste;

    public function __construct(string $nom, string $poste) {
        $this->nom = $nom;
        $this->poste = $poste;
    }

    public function getInformations(): string {
        
        //// TODO 1 : doit retourner "nom - poste"

        return $this->nom . " - " . $this->poste;

    }

    abstract public function travailler(): string;
}

// Classe Employé qui hérite de Collaborateur
class Employe extends Collaborateur {
    public function travailler(): string {

        //// TODO 2 : Renvoyer la string correspondante (cf les test et les résultats attendus)

 return $this->getInformations() . ": " . $this->getTacheSpecifique();

 private function getTacheSpecifique(): string {
    // Tâche spécifique pour un employé
    if ($this->poste === "Développeuse Back-End") {
        return "Node Express et Sequelize.";
    } elseif ($this->poste === "Responsable Marketing") {
        return "Organiser une réunion.";
    }
    return "Tâche non définie.";

    }
}

// Classe Prestataire qui hérite de Collaborateur
class Prestataire extends Collaborateur {
    public function travailler(): string {

        //// TODO 3 : Renvoyer la string correspondante (cf les test et les résultats attendus)
        
        return $this->getInformations() . ": Travailler sur une mission externe.";

    }
}

// Classe HRManager pour gérer les collaborateurs
class HRManager {
    private array $collaborateurs = [];

    public function ajouterCollaborateur(Collaborateur $collaborateur): void {
        
        //// TODO 4 : ajouter collaborateur au tableau de collaborateurs 
      
        $this->collaborateurs[] = $collaborateur;
    }

    // 
    public function afficherListeCollaborateurs(): void {
        echo "Liste des collaborateurs :\n";
        
        //// TODO 5 : Afficher les collaborateurs de la manière attendue (cf plus bas)
    
        foreach ($this->collaborateurs as $collaborateur) {
            echo "- " . $collaborateur->getInformations() . "\n";
        }
    }

    public function faireTravaillerToutLeMonde(): void {
        echo "\nExécution des tâches :\n";

        //// TODO 6 : fait "travailler" (d'ou la méthode) tout le monde : les employés et prestataires ! 

        foreach ($this->collaborateurs as $collaborateur) {
            echo "- " . $collaborateur->travailler() . "\n";
        }
    }
}

// Création de l'objet et appel des méthodes
$rh = new HRManager();
$rh->ajouterCollaborateur(new Employe("Alice Dupont", "Développeuse Back-End"));
$rh->ajouterCollaborateur(new Employe("Jean Martin", "Responsable Marketing"));
$rh->ajouterCollaborateur(new Prestataire("Jane Doe", "Consultante SEO"));

$rh->afficherListeCollaborateurs();
$rh->faireTravaillerToutLeMonde();


// Important : Résultats attendus suites aux opérations précedentes :

// Liste des collaborateurs (résultats - afficher Liste Collaborateurs) :
// - Alice Doe - Développeuse Back-End
// - Jean Martin - Responsable Marketing
// - Jane Doe - Consultante SEO

// Exécution des tâches (résultats - Faire Travailler Tout le monde) :
// - Alice Doe - Développeuse Back-End: Node Express et Sequelize.
// - Jean Martin - Responsable Marketing: Organiser une réunion.
// - Jane Doe - Consultante SEO: Travailler sur une mission externe.