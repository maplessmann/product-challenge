const body = document.querySelector('body');



/*
 * Creating a promise
 */
const productsArray = [],
      bestSellersArray = [],
      releasesArray = [];

const products = fetch('http://www.raphaelfabeni.com.br/rv/data.json');

products
    .then(data => data.json())
    .then(data => {
        productModule.renderBestSellers(data['best-sellers']);
        productModule.renderReleases(data.releases);
        console.log(data);
    })
    .catch(err => err)



/*
 * Menu toggle
 */
const hamburger = document.querySelector('.hamburger'),
      mobileMenu = document.querySelector('.menu-mobile');

function menuToggle() {
    this.classList.toggle('active');
    
    mobileMenu.classList.toggle('active');
}

hamburger.addEventListener('click', menuToggle);
