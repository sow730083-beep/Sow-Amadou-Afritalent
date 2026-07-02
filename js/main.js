/* ============================================
   AFRITALENT — main.js
   Commit 6 : Dark mode + Navbar dynamique au scroll
   ============================================ */

/* ==========================================
   1. DARK MODE avec localStorage
   ========================================== */

// On récupère le bouton dark mode dans la navbar
const btnDarkMode = document.getElementById('btn-dark-mode');

// Au chargement de la page, on vérifie si l'utilisateur
// avait déjà choisi le dark mode (sauvegardé dans localStorage)
function initialiserTheme() {
  const themeSauvegarde = localStorage.getItem('theme');

  if (themeSauvegarde === 'dark') {
    // On ajoute la classe dark-mode sur le body
    document.body.classList.add('dark-mode');
    // On met à jour l'icône du bouton
    if (btnDarkMode) {
      btnDarkMode.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }
  }
}

// Quand l'utilisateur clique sur le bouton dark mode
function basculerTheme() {
  // classList.toggle ajoute la classe si absente, la retire si présente
  document.body.classList.toggle('dark-mode');

  const estDarkMode = document.body.classList.contains('dark-mode');

  if (estDarkMode) {
    // Sauvegarde dans localStorage pour persister entre les pages
    localStorage.setItem('theme', 'dark');
    btnDarkMode.innerHTML = '<i class="bi bi-sun-fill"></i>';
  } else {
    localStorage.setItem('theme', 'light');
    btnDarkMode.innerHTML = '<i class="bi bi-moon-fill"></i>';
  }
}

// On attache l'événement click sur le bouton
if (btnDarkMode) {
  btnDarkMode.addEventListener('click', basculerTheme);
}

// On appelle la fonction au chargement de la page
initialiserTheme();


/* ==========================================
   2. NAVBAR DYNAMIQUE AU SCROLL
   ========================================== */

const navbar = document.querySelector('.navbar');

// Cette fonction est appelée à chaque fois que l'utilisateur scrolle
function gererNavbarAuScroll() {
  // window.scrollY = nombre de pixels scrollés depuis le haut
  if (window.scrollY > 50) {
    // On ajoute la classe 'scrolled' (définie dans le CSS)
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// On écoute l'événement scroll sur la fenêtre
if (navbar) {
  window.addEventListener('scroll', gererNavbarAuScroll);
}


/* ==========================================
   3. BOUTON RETOUR EN HAUT
   ========================================== */

const btnTop = document.getElementById('btn-top');

// Affiche ou cache le bouton selon la position du scroll
function gererBoutonTop() {
  if (window.scrollY > 300) {
    // display flex pour centrer l'icône
    btnTop.style.display = 'flex';
  } else {
    btnTop.style.display = 'none';
  }
}

// Remonte en haut de la page en douceur
function remonterEnHaut() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // animation douce
  });
}

if (btnTop) {
  // On écoute le scroll pour afficher/cacher le bouton
  window.addEventListener('scroll', gererBoutonTop);
  // On écoute le clic pour remonter
  btnTop.addEventListener('click', remonterEnHaut);
}


/* ============================================
   AFRITALENT — main.js
   Commit 7 : Compteurs animés + Animations fade-in
   ============================================ */


/* ==========================================
   4. COMPTEURS ANIMÉS AU SCROLL
   ========================================== */

// On récupère tous les éléments qui ont la classe "counter"
const tousLesCompteurs = document.querySelectorAll('.counter');

// Cette fonction anime un seul compteur
// Elle reçoit l'élément HTML et sa valeur cible
function animerCompteur(element, valeurCible) {
  let valeurActuelle = 0;

  // On calcule la vitesse : plus le chiffre est grand,
  // plus on avance vite à chaque étape
  const vitesse = Math.ceil(valeurCible / 100);

  // setInterval répète une action toutes les X millisecondes
  const intervalle = setInterval(function () {

    valeurActuelle += vitesse;

    if (valeurActuelle >= valeurCible) {
      // On a atteint la valeur cible : on arrête
      element.textContent = valeurCible.toLocaleString('fr-FR');
      clearInterval(intervalle);
    } else {
      // On n'a pas encore atteint la cible : on continue
      element.textContent = valeurActuelle.toLocaleString('fr-FR');
    }

  }, 20); // toutes les 20 millisecondes
}


// IntersectionObserver : détecte quand un élément
// entre dans la zone visible de l'écran (le viewport)
const observateurCompteurs = new IntersectionObserver(

  function (entries) {
    // entries = liste des éléments observés
    entries.forEach(function (entry) {

      // entry.isIntersecting = true quand l'élément est visible
      if (entry.isIntersecting) {

        const element = entry.target;

        // On lit la valeur cible depuis l'attribut data-target
        // ex : <span class="counter" data-target="2500">
        const valeurCible = parseInt(element.dataset.target);

        // On lance l'animation
        animerCompteur(element, valeurCible);

        // On arrête d'observer cet élément pour ne pas
        // relancer l'animation à chaque fois
        observateurCompteurs.unobserve(element);
      }
    });
  },

  // Options : déclenche quand 20% de l'élément est visible
  { threshold: 0.2 }
);

// On demande à l'observateur de surveiller chaque compteur
tousLesCompteurs.forEach(function (compteur) {
  observateurCompteurs.observe(compteur);
});


/* ==========================================
   5. ANIMATIONS FADE-IN DES SECTIONS
   ========================================== */

// On récupère tous les éléments avec la classe "fade-in"
// (tu les as ajoutés sur tes sections au commit 4)
const elementsFadeIn = document.querySelectorAll('.fade-in');

// Un deuxième IntersectionObserver pour les animations
const observateurFadeIn = new IntersectionObserver(

  function (entries) {
    entries.forEach(function (entry) {

      if (entry.isIntersecting) {
        // On ajoute la classe "visible" définie dans le CSS
        // Le CSS s'occupe de l'animation (opacity + translateY)
        entry.target.classList.add('visible');

        // On arrête d'observer : l'animation ne se joue qu'une fois
        observateurFadeIn.unobserve(entry.target);
      }
    });
  },

  // Déclenche quand 10% de l'élément est visible
  { threshold: 0.1 }
);

// On observe chaque élément fade-in
elementsFadeIn.forEach(function (element) {
  observateurFadeIn.observe(element);
});