// Variable globale qui garde en mémoire l'index de la diapositive affichée
let slideIndex = 0;

// On lance immédiatement l'affichage des diapositives au chargement
chauvesouris();

// Fonction qui permet de changer de diapositive en ajoutant un décalage (n peut être +1 ou -1)
function changeSlide(n) {
    slideIndex += n;      // On modifie l'index courant
    chauvesouris();         // On met à jour l'affichage
}

// Fonction qui permet d'aller directement à une diapositive précise (n est l'index choisi)
function currentSlide(n) {
    slideIndex = n;       // On fixe l'index sur la diapositive demandée
    chauvesouris();         // On met à jour l'affichage
}

// Fonction principale qui gère l'affichage des diapositives et des "dots"
function chauvesouris() {
    // Récupère toutes les diapositives (éléments HTML avec la classe "slides")
    let slides = document.getElementsByClassName("slides");
    // Récupère tous les points de navigation (éléments HTML avec la classe "dot")
    let dots = document.getElementsByClassName("dot");

    // Si l'index dépasse le nombre de diapositives, on revient au début
    if (slideIndex >= slides.length) { 
        slideIndex = 0; 
    }
    // Si l'index est inférieur à 0, on revient à la dernière diapositive
    if (slideIndex < 0) { 
        slideIndex = slides.length - 1; 
    }

    // Boucle qui cache toutes les diapositives et désactive tous les points
    for (let bacterie = 0; bacterie < slides.length; bacterie++) {
        slides[bacterie].style.display = "none"; // On cache la diapositive
        // On enlève la classe "active-dot" pour désactiver le point
        dots[bacterie].className = dots[bacterie].className.replace(" active-dot", "");
    }

    // On affiche uniquement la diapositive correspondant à slideIndex
    slides[slideIndex].style.display = "block";
    // On ajoute la classe "active-dot" au point correspondant
    dots[slideIndex].className += " active-dot";
}