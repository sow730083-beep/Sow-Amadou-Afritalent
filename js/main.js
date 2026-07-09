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


/* ============================================
   AFRITALENT — main.js
   Commit 8 : Filtrage freelances + Validation formulaire
   ============================================ */


/* ==========================================
   6. FILTRAGE DYNAMIQUE DES FREELANCES
   ========================================== */

// On récupère tous les boutons de filtre
const boutonsFiltres = document.querySelectorAll('.btn-filtre');

// On récupère toutes les cartes freelances
// Chaque carte a un attribut data-categorie sur sa colonne
const colonnesFreelances = document.querySelectorAll('#liste-freelances > div');

// Cette fonction filtre les cartes selon la catégorie choisie
function filtrerFreelances(categorieChoisie) {

  colonnesFreelances.forEach(function (colonne) {

    const categorieColonne = colonne.dataset.categorie;

    if (categorieChoisie === 'tous' || categorieColonne === categorieChoisie) {
      // La carte correspond au filtre : on l'affiche
      colonne.style.display = 'block';
    } else {
      // La carte ne correspond pas : on la cache
      colonne.style.display = 'none';
    }
  });
}

// On écoute le clic sur chaque bouton de filtre
boutonsFiltres.forEach(function (bouton) {

  bouton.addEventListener('click', function () {

    // On retire la classe "actif" de tous les boutons
    boutonsFiltres.forEach(function (b) {
      b.classList.remove('actif');
    });

    // On ajoute la classe "actif" sur le bouton cliqué
    bouton.classList.add('actif');

    // On récupère la catégorie depuis l'attribut data-categorie
    const categorie = bouton.dataset.categorie;

    // On lance le filtrage
    filtrerFreelances(categorie);
  });
});


/* ==========================================
   7. VALIDATION DU FORMULAIRE DE CONTACT
   ========================================== */

const formulaire = document.getElementById('formulaireContact');

// --- Fonctions utilitaires ---

// Affiche un message d'erreur sous un champ
function afficherErreur(idErreur, message) {
  const zoneErreur = document.getElementById(idErreur);
  if (zoneErreur) {
    zoneErreur.textContent = message;
  }
}

// Efface le message d'erreur d'un champ
function effacerErreur(idErreur) {
  const zoneErreur = document.getElementById(idErreur);
  if (zoneErreur) {
    zoneErreur.textContent = '';
  }
}

// Marque un champ comme invalide (bordure rouge)
function marquerInvalide(champ) {
  champ.classList.remove('valide');
  champ.classList.add('invalide');
}

// Marque un champ comme valide (bordure verte)
function marquerValide(champ) {
  champ.classList.remove('invalide');
  champ.classList.add('valide');
}

// Vérifie le format d'un email avec une regex
// La regex vérifie qu'il y a : quelquechose @ quelquechose . quelquechose
function estEmailValide(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


// --- Validation de chaque champ ---

function validerPrenom() {
  const champ = document.getElementById('prenom');
  if (!champ) return true;

  const valeur = champ.value.trim(); // trim() supprime les espaces inutiles

  if (valeur === '') {
    marquerInvalide(champ);
    afficherErreur('erreur-prenom', 'Le prénom est obligatoire.');
    return false;
  }

  marquerValide(champ);
  effacerErreur('erreur-prenom');
  return true;
}

function validerNom() {
  const champ = document.getElementById('nom');
  if (!champ) return true;

  const valeur = champ.value.trim();

  if (valeur === '') {
    marquerInvalide(champ);
    afficherErreur('erreur-nom', 'Le nom est obligatoire.');
    return false;
  }

  marquerValide(champ);
  effacerErreur('erreur-nom');
  return true;
}

function validerEmail() {
  const champ = document.getElementById('email');
  if (!champ) return true;

  const valeur = champ.value.trim();

  if (valeur === '') {
    marquerInvalide(champ);
    afficherErreur('erreur-email', "L'email est obligatoire.");
    return false;
  }

  if (!estEmailValide(valeur)) {
    marquerInvalide(champ);
    afficherErreur('erreur-email', "Le format de l'email est invalide (ex: nom@email.com).");
    return false;
  }

  marquerValide(champ);
  effacerErreur('erreur-email');
  return true;
}

function validerSujet() {
  const champ = document.getElementById('sujet');
  if (!champ) return true;

  if (champ.value === '') {
    marquerInvalide(champ);
    afficherErreur('erreur-sujet', 'Veuillez choisir un sujet.');
    return false;
  }

  marquerValide(champ);
  effacerErreur('erreur-sujet');
  return true;
}

function validerMessage() {
  const champ = document.getElementById('message');
  if (!champ) return true;

  const valeur = champ.value.trim();

  if (valeur === '') {
    marquerInvalide(champ);
    afficherErreur('erreur-message', 'Le message est obligatoire.');
    return false;
  }

  // Le message doit faire au moins 20 caractères
  if (valeur.length < 20) {
    marquerInvalide(champ);
    afficherErreur(
      'erreur-message',
      `Message trop court : ${valeur.length}/20 caractères minimum.`
    );
    return false;
  }

  marquerValide(champ);
  effacerErreur('erreur-message');
  return true;
}


// --- Validation en temps réel (pendant la saisie) ---
// L'utilisateur voit les erreurs disparaître au fur et à mesure

const champPrenom = document.getElementById('prenom');
const champNom = document.getElementById('nom');
const champEmail = document.getElementById('email');
const champSujet = document.getElementById('sujet');
const champMessage = document.getElementById('message');

if (champPrenom) champPrenom.addEventListener('input', validerPrenom);
if (champNom)    champNom.addEventListener('input', validerNom);
if (champEmail)  champEmail.addEventListener('input', validerEmail);
if (champSujet)  champSujet.addEventListener('change', validerSujet);
if (champMessage) champMessage.addEventListener('input', validerMessage);


// --- Soumission du formulaire ---

if (formulaire) {

  formulaire.addEventListener('submit', function (event) {

    // On empêche le rechargement de la page (comportement par défaut)
    event.preventDefault();

    // On valide tous les champs
    const prenomOk  = validerPrenom();
    const nomOk     = validerNom();
    const emailOk   = validerEmail();
    const sujetOk   = validerSujet();
    const messageOk = validerMessage();

    // Si tous les champs sont valides
    if (prenomOk && nomOk && emailOk && sujetOk && messageOk) {

      // On affiche le message de succès
      const messageSucces = document.getElementById('message-succes');
      if (messageSucces) {
        messageSucces.style.display = 'block';
      }

      // On remet le formulaire à zéro
      formulaire.reset();

      // On retire les classes valide/invalide
      const tousLesChamps = formulaire.querySelectorAll('input, select, textarea');
      tousLesChamps.forEach(function (champ) {
        champ.classList.remove('valide', 'invalide');
      });

      // On cache le message de succès après 5 secondes
      setTimeout(function () {
        if (messageSucces) {
          messageSucces.style.display = 'none';
        }
      }, 5000);
    }
  });
}


/* ============================================
   AFRITALENT — main.js
   Commit 9 : Finalisation — année dynamique + commentaires
   ============================================ */


/* ==========================================
   8. ANNÉE DYNAMIQUE DANS LE FOOTER
   ========================================== */

// new Date() crée un objet date avec la date d'aujourd'hui
// getFullYear() extrait uniquement l'année (ex: 2026)
const elementAnnee = document.getElementById('annee');

if (elementAnnee) {
  elementAnnee.textContent = new Date().getFullYear();
}
