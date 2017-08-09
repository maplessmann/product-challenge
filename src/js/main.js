const body = document.querySelector('body');



/*
 * Initializing the arrays
 */
const productsArray = [];

/*
 * Including multiple Promises as a further guarantee of data accessibility.
 * The first resolved Promise will return the data and ignore the rest.
 */
const productsLocal = fetch('http://localhost:8000/src/js/data/data.json');
const productsRemote = fetch('http://www.raphaelfabeni.com.br/rv/data.json');

Promise
    .race([productsLocal, productsRemote])
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
