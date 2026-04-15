<?php

// 1 - Pouvoir chercher des livres (genre ou nom) via l'API google Books soit avec JS (fetch ou axios) soit cURL
// 2 - UN système de login et signup pour les Users (si pas login, il peut pas chercher)
// 3 - Une fois connecté le user peut ajouter des livres en favoris qui s'enregistrent en BDD. Il doit pouvoir aussi 
// supprimer ceux qu'il veut effacer => Pour tout ce qui est BDD avec PHP on utilise PDO et de requetes préparées
// 4 - Le user a un espace de profil dont il peut modifier les informations (ex : nom, email, avatar)

// Notions à utiliser en PHP : 
// - les superglobales ($_POST, $_GET, $_SESSION)
// - PDO pour se connecter à la BDD 
// - Faire des requetes SQL (et préparées si besoin)
// - cURL pour faire des requetes API (ou sinon fetch avec JS)

// Notions en JS :  
// - fetch ou axios pour le call API si pas en PHP



?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

 
</head>
<body>

<center>
<div class="input-part">
<input class="search" type="text" placeholder="checher un film ou une série...">
<button class="searchBtn">Rechercher</button>
<button class="favBtn">Favoris</button>
</div>
</center>
<div class="resultats">
<!-- Afficher les résultats de l'API  -->
 
</div>   

</body>
</html>
<script defer>
    
// MOVIE DB API 

// Vous aller coder une app permettant de rechercher, filtrer et liker les films/series
// L'API est la suivante : https://www.omdbapi.com/

let apiKey = "AIzaSyC11W3XUZL4w-QWH3oTeq8lZ7TzQdFkzRs"
let genres = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Family", "Drama", "Fantasy", "Horror", "Romance", "Mystery", "Thriller", "Sci-Fi"]

// 1 - Vous allez d'abord vérifier le bon fonctionnement de l'API (vous aurez besoin d'une clé API)
// 2 - Vous coderez ensuite les éléments HTML du front (input de recherche, boutons de filtres etc)
// 3 - Vous reliez ensuite le HTML au JS 
// 4 - Dans la requete API il faudra afficher les bons films selon la recherche
// 5 - Ensuite il faudra faire fonctionner les boutons de filtres (ex: le genre de films/séries)
// 6 - 
// Enfin il faudra sauvegarder en LS les favoris et avoir accès à une partie favoris 
// 7 - On doit pouvoir supprimer les éléments des favoris (et donc aussi en LS)   

// Ajout de filtres : On va vouloir ajouter les filtres pas genre afin de classer nos résultats de recherche
// Il va falloir un menu avec les boutons de filtres 
// Lorsquer l'on clique sur un des filtres les films correspondant s'affichent.
// En résumé on veut comparer le genre sur lequel on clique avec le genre de tous les films 
// affichés en résultat de recherche. Pour accéder aux genres d'un film on devra passer par une autre URL 
// qui nous permet de récupérer les genres (l'URL avec le paramètre t = titreDuFilm) - voir la doc OMDB

// je recup mes éléments HTML
let userInput = document.querySelector(".search")
let searchBtn = document.querySelector(".searchBtn")
let resultsZone = document.querySelector(".resultats")
let favorites = document.querySelector(".favBtn")

// J'écoute le bouton de recherche
searchBtn.addEventListener("click", () => {

    searchMovie()
})

// Ecoute deds boutons de favoris
favorites.addEventListener("click", () => {
    // Je vais vider ma zone de resultats 
    resultsZone.innerHTML = ""

    // Je recup mon tableau de favoris
    let favs = JSON.parse(localStorage.getItem("favs")) || []

    // Si le tableau n'est pas vide j'affiche les favoris ...
    if (favs.length > 0) {
        displayMovies(favs)
    // ... sinon un message qui dit qu'il n'y en a pas pour le moment
    } else {
        resultsZone.textContent = "Vous n'avez pour le moment pas de favoris ..."
    }
})


// Fonction de recherche de films 
function searchMovie()  {
    // On recup ce que le user tape dans l'input
    let userSearch = userInput.value

    // On vide la zone de résultats
    resultsZone.innerHTML = ""

    fetch("https://www.googleapis.com/books/v1/volumes/AIzaSyC11W3XUZL4w-QWH3oTeq8lZ7TzQdFkzRs", {
        "Content-Type": "application/json"
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
        // Ici on va recup les infos des films et les afficher adequatement
        displayMovies(data.Search)

    })
    .catch(err => console.log(err)) 
}


// Fonction d'affichage des films depuis un tableau d'objets
function displayMovies(results) {
    results.forEach(movie => {
        let container = document.createElement("div")
        let image = document.createElement("img")
        let title = document.createElement("h2")
        let date = document.createElement("p")
        let favBtn = document.createElement("button")

        image.src = movie.Poster
        title.textContent = movie.Title
        date.textContent = movie.Year

        if (movie.fav === true) {
             favBtn.textContent = "Supprimer des favoris"

             favBtn.addEventListener("click", () => {
                // Ajout des favs dans le LS 
                deleteFromFav(movie)
            })
        } else {
            favBtn.textContent = "Ajouter aux favoris"

            favBtn.addEventListener("click", () => {
                // Ajout des favs dans le LS 
                addToFav(movie)
            })
        }

        container.append(image, title, date, favBtn)
        resultsZone.appendChild(container)
    })
}


function addToFav(movie) {
    // On veut rajouter le film au LS
    // Dans un premier temps on vient recup le tableau des favs, si il existe, depuis le LS
// Ici favs est mon tableau de favoris recup depuis le LS 
    // Si il n'y en a aucun de trouvé dans le LS alors on initialise un tableau vide
    let favs = JSON.parse(localStorage.getItem("favs")) || []

    // Dans mon objet de film je rajoute la clé fav et lui donne la valeur true 
    // Adfin de signifier que mon film est dans les favoris
    movie.fav = true

    // J'ajoute mon film au LS 
    favs.push(movie)

    // Je sauvegarde le nouveau tableau mis à jour en LS
    localStorage.setItem("favs", JSON.stringify(favs))
}


function deleteFromFav(movie) {
    // On recup le tableau des favs
    let favs = JSON.parse(localStorage.getItem("favs")) || []

    // On filtre le movie du tableau via l'ID
    let newFavs = favs.filter(elem => elem.imdbID != movie.imdbID)

    // On réenregistre la nouvelle version du tableau en LS 
    localStorage.setItem("favs", JSON.stringify(newFavs))

    // Je modifie la clé fav afin d'afficher le bon bouton
    movie.fav = false

    // On vide la zone de résultats à nouveau 
    // Avanty d'afficher la liste des favoris mis à jour 
    resultsZone.innerHTML = ""

    // Si le tableau n'est pas vide j'affiche les favoris ...
    if (newFavs.length > 0) {
        displayMovies(newFavs)
    // ... sinon un message qui dit qu'il n'y en a pas pour le moment
    } else {
        resultsZone.textContent = "Vous n'avez pour le moment pas de favoris ..."
    }

}

// Fonction de filtrage par genre
function filterMovies(genre) {
    // On recup les films de notre zone de rédsultats 
    let movies = Array.from(resultsZone.children)
    // On déclare notre tableau dezs films filtrés
    let filteredMovies = []
    
    if (movies.length) {
        // Pour chaque film de ma zone de résultats je viens faire un fetch 
        // avec une autre URL qui me permet de recup les genres.
        movies.forEach(movie => {
            let title = movie.childNodes[1].textContent
            // Je récupère les genres pour chaque film
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${title}`)
            .then(data => data.json())
            .then(res => {
    
                // Si le film contient bien le gnre sur lequel on a cliqué alors on l'affiche sionon pas
                if (res.Genre.includes(genre)) {
                    // resultsZone.innerHTML = ""

                    filteredMovies.push(movie)
                    // resultsZone.appendChild(movie)
                }
                // console.log(filteredMovies)
            })
            .catch(err => console.log(err))
        })
    
        // Avec le setTimeout (asynchrone) je récup le tableau des films filtrés 
        // et j'affiche un message d'erreur si celui-ci est vide
        setTimeout(() => {
            resultsZone.innerHTML = "erreur"
    
            // Si jamais le tableau des films filtrés est vide on affiche une erreur
            if (filteredMovies.length === 0) {            
                resultsZone.innerHTML = "<h3>Aucun résultat trouvé...</h3>"
    
            // Sinon on insère les films dans la zone de résultats
            } else {
                filteredMovies.forEach(movie => {
                    resultsZone.appendChild(movie)
                })
            }
        }, 500)
    }
}


//// MENU DES CATEGORIES 

// Affichage des boutons de filtre à partir du tableau genres
genres.forEach(genre => {
    let btn = document.createElement("button") 
    btn.textContent = genre

    // J'écoute le click pour chaque bouton de filtre 
    btn.addEventListener("click", () => {

        if (resultsZone.innerHTML === "<h3>Aucun résultat trouvé...</h3>") {
            // Réaffiche les films(lorsque l'on a 0 résultats pour des filtres)
            searchMovie()
        } else {
            // Fonction de filtrage par genre
            filterMovies(genre)
        }
    })

    filtersMenu.appendChild(btn)
})

</script>
