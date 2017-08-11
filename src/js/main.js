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



/*
 * Slider
 */
const slider = document.querySelectorAll('.slider-bullets');
slider.forEach(item => {
    const bullets = item.querySelectorAll('.bullet');
    bullets.forEach((bullet, index) => {
        bullet.addEventListener('click', slide);

        function slide() {

            // Passa o slider
            const slider = this.closest('.products').querySelectorAll('.slider .slider-item');
            slider.forEach(item => {
                item.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
            });

            // Adiciona a class 'active' na bullet selecionada e remove das demais
            const all = this.parentNode.querySelectorAll('.bullet');
            all.forEach(bullet => bullet.classList.remove('active'));
            this.classList.add('active');
        }
    });
});
