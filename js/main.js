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