const body = document.querySelector('body');


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
 * Initializing the array of products
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

        return data;
    })
    .then(data => {
        productsArray.push(...data['best-sellers'], ...data.releases);
        console.log('Produtos', productsArray);

        listenFilters();
    })
    .catch(err => err)



/*
 * Makes the products filter
 */
function listenFilters() {

    const checkboxes = document.querySelectorAll('.category .checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', makeArray);
    });


    /*
     * Put all selected filters in an array
     */
    let filtros = [];

    function makeArray() {
        const currentFilter = this.getAttribute('data-filter');

        if(this.checked) {
            filtros.push(currentFilter);
        } else {
            const index = filtros.indexOf(currentFilter);
            filtros.splice(index, 1);
        }

        // If filter returns an empty array [], then list all products
        const filteredProducts = productModule.filter(filtros);
        const isEmpty = (item) => !item.length > 0;
        let products = isEmpty(filteredProducts) ? productsArray : filteredProducts;
        productModule.renderProducts(products, 'best-sellers');

        // updateMarkup(filteredProducts);
    }


}
