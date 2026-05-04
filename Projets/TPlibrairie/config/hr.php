<?php

interface IPersonnel {
    public function travailler(): string;
}

abstract class Collaborateur implements IPersonnel {
    protected string $nom;
    protected string $poste;

    public function __construct(string $nom, string $poste) {
        $this->nom = $nom;
        $this->poste = $poste;
    }

    public function getInformations(): string {
        return $this->nom . " - " . $this->poste;
    }

    abstract public function travailler(): string;
}

class Employe extends Collaborateur {

    public function travailler(): string {
        return $this->getInformations() . ": " . $this->getTacheSpecifique();
    }

    private function getTacheSpecifique(): string {
        if ($this->poste === "Développeuse Back-End") {
            return "Node Express et Sequelize.";
        } elseif ($this->poste === "Responsable Marketing") {
            return "Organiser une réunion.";
        }
        return "Tâche non définie.";
    }
}

class Prestataire extends Collaborateur {
    public function travailler(): string {
        return $this->getInformations() . ": Travailler sur une mission externe.";
    }
}

class HRManager {
    private array $collaborateurs = [];

    public function ajouterCollaborateur(Collaborateur $collaborateur): void {
        $this->collaborateurs[] = $collaborateur;
    }

    public function afficherListeCollaborateurs(): void {
        echo "Liste des collaborateurs :\n";

        foreach ($this->collaborateurs as $collaborateur) {
            echo "- " . $collaborateur->getInformations() . "\n";
        }
    }

    public function faireTravaillerToutLeMonde(): void {
        echo "\nExécution des tâches :\n";

        foreach ($this->collaborateurs as $collaborateur) {
            echo "- " . $collaborateur->travailler() . "\n";
        }
    }
}

// Test
$rh = new HRManager();
$rh->ajouterCollaborateur(new Employe("Alice Dupont", "Développeuse Back-End"));
$rh->ajouterCollaborateur(new Employe("Jean Martin", "Responsable Marketing"));
$rh->ajouterCollaborateur(new Prestataire("Jane Doe", "Consultante SEO"));

$rh->afficherListeCollaborateurs();
$rh->faireTravaillerToutLeMonde();