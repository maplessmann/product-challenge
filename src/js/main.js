/*
 * Toggle menu
 */
const hamburger = document.querySelector('.hamburger'),
      mobileMenu = document.querySelector('.menu-mobile');

function menuToggle() {
    this.classList.toggle('active');

    mobileMenu.classList.toggle('active');
}

hamburger.addEventListener('click', menuToggle);
