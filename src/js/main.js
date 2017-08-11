/*
 * Toggle the class 'active' when the user activates the mobile menu
 */
const hamburger = document.querySelector('.hamburger'),
      mobileMenu = document.querySelector('.menu-mobile');

function menuToggle() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

hamburger.addEventListener('click', menuToggle);



/*
 * Carregada as animações em sequência
 */
(function() {

    const body = document.querySelector('body');

    window.addEventListener('load', function() {
        setTimeout(() => {
            loadAnimation();
        }, 500);
    });

    function loadAnimation() {
        const items = document.querySelectorAll('.has-animation');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('is-visible');
            }, 120 * index);
        });
    }

})();
